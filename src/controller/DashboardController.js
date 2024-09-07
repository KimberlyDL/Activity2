const index = (req, res) => {
    res.render('dashboard', {layout: 'layout' })
}

module.exports = {
    index
}