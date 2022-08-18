const Influx = require('influx'); //导包

// 定义数据库连接和数据格式，创建client
const client = new Influx.InfluxDB({
    database: 'mydb',
    username: 'root',
    password: 'root',
    hosts: [{ host: 'xx.xx.xx.xxx' }],
    schema: [
        {
            measurement: 'test', //类似于数据表的概念
            fields: { //数据表的字段，定义类型，FLOAT/INTEGER/STRING/BOOLEAN
                field1:Influx.FieldType.INTEGER,
                field2:Influx.FieldType.INTEGER,
            }, // tag 也是里面的字段，是自带索引光环。查询速度杠杠的。
            tags: ['tag1','tag2']
        }
    ]
});
