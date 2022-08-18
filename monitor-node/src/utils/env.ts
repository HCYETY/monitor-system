import { ClientOptions, InfluxDB } from "@influxdata/influxdb-client";

export const INFLUX_URL: string | ClientOptions = 'http://localhost:8086'
export const INFLUX_TOKEN: string  = '2bUXF61Qg7NWumhb1T6l9qwM70qq4ewURkv5GGISZWNCd9_jveXhd2rDUERvtPCwDCLRxJp2-Y4NPyPmQzPVUw=='
export const INFLUX_ORG: string  = 'influxdb'

export const clientDB = new InfluxDB({url: INFLUX_URL, token: INFLUX_TOKEN});
export const queryApi = clientDB.getQueryApi(INFLUX_ORG);
