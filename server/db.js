module.exports = (mongoose) => {
  let url = 'mongodb+srv://lovecatso:xhj5211314sgl@cluster0-oxrkq.mongodb.net/vueshop?retryWrites=true&w=majority'
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  let db = mongoose.connection
  db.once('open', () => {
    console.log('数据库链接成功')
  })
}
