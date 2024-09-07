const index = (req, res) => {
    res.render('home', {layout: 'layout',
        array: ['a', 'b', 'c', 'd'],
        message: 'Greeting people of earth!'
    })
}



module.exports = {
    index
}