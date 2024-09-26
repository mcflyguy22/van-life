import Charts from '../../../public/barchart.png'


export default function Income() {
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
                <div className="transaction">
                    <h4>$720</h4>
                    <p>1/12/22</p>
                </div>
                <div className="transaction">
                    <h4>$560</h4>
                    <p>10/11/22</p>
                </div>
                <div className="transaction">
                    <h4>$980</h4>
                    <p>11/23/2022</p>
                </div>
            </div>
        </>
    )
}