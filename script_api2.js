import http from 'k6/http';
import {Rate} from 'k6/metrics';
import {check, group} from 'k6';


//test3
export let options = {
    tags: {
        project: 'api2',
      },
    discardResponseBodies: true,
    scenarios: {
        happy_scenary: {
        executor: 'ramping-arrival-rate',
        exec: 'happy_scenary',
        startRate: 1,
        preAllocatedVUs: 6,
        timeUnit: '1s',
        maxVUs: 16,
        stages: [
            { target: 6, duration: '2m'},
            { target: 10, duration: '30s'}
        ],
        },
    },
};

let scenary = ''

const myFailRate = new Rate('errorRate');

export function metrics(resp)
{
    myFailRate.add(resp.status !== 200)
    check(resp, {"status was 200": (r) => r.status == 200})
}

const URL = 'https://d28nmxpi7a6di.cloudfront.net'

export function logicflow(){
    group ('api', function(){
        let first_page = http.get(`${URL}/api`, {tags:{ name: 'api'}})
        metrics(first_page)
        //console.log(first_page)
        })
}

export function happy_scenary() {
    scenary = 'happy_scenary',
    logicflow()
}
