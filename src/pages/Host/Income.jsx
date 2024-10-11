import Charts from '../../../public/barchart.png'


export default function Income() {
    const transactionsData = [
        { amount: 720, date: "1/3/2023", id: "1" },
        { amount: 560, date: "12/12/2022", id: "2" },
        { amount: 980, date: "12/3/2022", id: "3" },
    ]
    
    return (
        <>
            <div className="income-head">
                <h1>Income</h1>
                <p>Last <span>30 days</span></p>
                <h2>$2,260</h2>
                <img src={Charts}/>
                <div>
                    <strong>Your transactions (3)</strong>
                    <p>Last <span>30 days</span></p>
                </div>
                {transactionsData.map((item, index) => (

                        <div key={index} className="transaction">
                            <h4>${item.amount}</h4>
                            <p>{item.date}</p>
                        </div>

                ))}
            </div>
        </>
    )
}