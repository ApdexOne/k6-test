import http from 'k6/http';
import {SharedArray} from 'k6/data';
import {Rate} from 'k6/metrics';
import {check, group} from 'k6';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import {uuidv4} from 'https://jslib.k6.io/k6-utils/1.0.0/index.js';
import jsonpath from 'https://jslib.k6.io/jsonpath/1.0.2/index.js';


export let options = {
    discardResponseBodies: true,  
    scenarios: {
        happy_scenary: {
        executor: 'ramping-arrival-rate',
        exec: 'happy_scenary',
        startRate: 1,
        preAllocatedVUs: 6,
        timeUnit: '10s',
        maxVUs: 16,
        stages: [
            { target: 6, duration: '10m'},
            { target: 10, duration: '5m'}

        ],
        },
        failed_scenary: {
        executor: 'ramping-arrival-rate',
        exec: 'failed_scenary',
        startRate: 1,
        timeUnit: '5s',
        preAllocatedVUs: 3,
        maxVUs: 10,
        stages: [
            { target: 3, duration: '1m' },
            { target: 7, duration: '10m'}
        ],
        },
    },
};

const myFailRate = new Rate('errorRate');

export function metrics(resp)
{
    myFailRate.add(resp.status !== 200)
    check(resp, {"status was 200": (r) => r.status == 200})
}

const URL = 'https://www.blazedemo.com'

let scenary = ''
const user_data = new SharedArray("user_data", function() {return papaparse.parse(open('users.csv'), { header: true }).data;});

export function logicflow(){
    let user = user_data[Math.floor(Math.random() * user_data.length)] 
    let headers = {'Accept-Language': 'en-US,en;q=0.5', 'Upgrade-Insecure-Requests': 1, 'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0', 'Accept-Encoding': 'gzip, deflate', 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'}
    group ('/', function(){
        let first_page = http.get(`${URL}/`, {headers: headers, tags:{ name: '/'}})
        metrics(first_page)
        })
    
    headers['Referer'] = headers['Origin'] = URL
    headers['Content-Type'] = 'application/x-www-form-urlencoded'
    let flight, price, street
    flight = street= Math.floor(Math.random() * 100);
    price = Math.floor(Math.random() * 10.5);
    group ('/reserve', function(){
        let reserve = http.post(`${URL}/reserve.php`, {'fromPort': user.from, 'toPort': user.to}, {headers: headers, responseType: 'text', tags:{ name: '/reserve'}})
        metrics(reserve)
        })
    
    group ('/purchase', function(){
        let purchase = http.post(`${URL}/purchase.php`, {'flight': flight, 'price': price, 'airline': 'United Airlines', 'fromPort': user.from, 'toPort': user.to }, {headers: headers, tags:{ name: '/purchase'}})
        metrics(purchase)
        })
    group ('/confirmation', function(){
        let data_conf = {}
        let confirmation
        data_conf = {'_token': '', 'inputName': user.name, 'address': street, 'city': 'Montevideo', 'state': 'Montevideo', 'zipCode': '11100', 'cardType': '523641789658', 'creditCardMonth': 11, 'creditCardYear': 2017, 'nameOnCard': 'OCA', 'rememberMe': 'on'  }
        let header_conf = {}
        header_conf = {headers: headers, responseType: 'text', tags:{ name: '/confirmation'}}
        if(scenary == 'Happy scenary'){
            confirmation = http.post(`${URL}/confirmation.php`, data_conf, header_conf)
        }
        else {
            confirmation = http.post(`${URL}/confirmations.php`, data_conf, header_conf)
        }
        metrics(confirmation)
        })
}

export function happy_scenary() {
    scenary = 'happy_scenary',
    logicflow()
}
export function failed_scenary() {
    scenary = 'failed_scenary',
    logicflow()
}
