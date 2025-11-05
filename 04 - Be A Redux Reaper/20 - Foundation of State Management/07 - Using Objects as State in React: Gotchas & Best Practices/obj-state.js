function profile() {
    const [user, setUser] = React.useState({
        name: 'John Doe',
        age: 30,
        address: {
            city: 'New York',
            country: 'USA'
        }
    })
}


const handleUpdateCity = () => {
    setUser(prev => (
        {
            ...prev,
            address: {
                ...prev.address,
                city: 'Los Angeles'
            }
        }
    ))
}

