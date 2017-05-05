class UnrealizedGraph extends StewardGraph {
    constructor(ctx, port) {
        super("Unrealized Gains");
        this.port = port;
        super.makeGraph();
    }

    update(name) {
        this.port = name;
        super.update();      
    }

    getData(callback) {
        let url = activeTabIsPort ? '/getUnrealizedData' : '/getBalanceOverTime';
        $.post(url, {name:this.port}, (res) => {            
            let data = JSON.parse(res);
            let labels = [];
            let chartData = [];
            let c = 0;
            for (let i = 0; i < data.length; i++) {
                let p = data[i];
                labels.push(new Date(p[0]*1000));
                chartData.push({x: c, y: p[1]});
                c += 1;
            }
            this.data = chartData;
            this.labels = labels;
            if (chartData.length > 0) {
                this.min = chartData[0].x;
                this.max = chartData[chartData.length - 1].x;
            } else {
                this.min = -1;
                this.max = 1;
            }
            callback();
        });
    }

    getPredict(){}
}