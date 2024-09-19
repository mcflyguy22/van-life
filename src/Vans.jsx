
export default function Vans() {
    return (
        <div className="vans-container">
            <div className="vans-filters">
                <h1>Explore our van options</h1>
                <div className="vans-filter-options">
                    <button className="simple-vans">Simple</button>
                    <button className="luxury-vans">Luxury</button>
                    <button className="rugged-vans">Rugged</button>
                    <a href="#">Clear filters</a>
                </div>
            </div>
            <div className="vans-list">
                <div className="van">
                    Van 1
                </div>
                <div className="van">
                    Van 2
                </div>
                <div className="van">
                    Van 3
                </div>
                <div className="van">
                    Van 4
                </div>
                <div className="van">
                    Van 5
                </div>
                <div className="van">
                    Van 6
                </div>
            </div>
        </div>
    )
}