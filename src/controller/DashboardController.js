const index = (req, res) => {
    res.render('dashboard', {layout: 'layout',
        array: ['a', 'b', 'c', 'd'],
        message: 'Greeting people of earth!'
    })
}



module.exports = {
    index
}