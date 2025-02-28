async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    // let response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=f65791a770c14f3fbafc0dff95a060c9')

    // let result = await response.json()
    // console.log(result)
    // let GME = result.GME
    // let MSFT = result.MSFT
    // let DIS = result.DIS
    // let BNTX = result.BNTX

    const { GME, MSFT, DIS, BNTX } = mockData; 
    
    const stocks = [GME, MSFT, DIS, BNTX];
    

    stocks.forEach( stock => stock.values.reverse())

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map( value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        },
    });                                                  
    function getColor(stock){
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['GME',"MSFT","DIS","BNTX"], 
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: highestPrice(),
                backgroundColor:  getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });
    function highestPrice(){
        let argh = []
        for(let i=0 ; i<stocks.length; i++){
            let x = stocks[i].values.map( value => Number(value.high))
            let y = Math.max(...x)
            y += i
            argh.push(y)
        }
        console.log(argh)
        return argh
         
        
    }
    
    // let p = stocks[0].values.map( value => Number(value.high))
    // h = Math.max(...p)
    // console.log(h)

}

main()

