const jsonserver = require('json-server')
const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const archiver = require('archiver')
const crypto = require('crypto')
const del = require('del')

const server = jsonserver.create()
const router = jsonserver.router('./json-server.json')
const middleware = jsonserver.defaults()

/**
 * 递归遍历文件夹
 *
 * @param {String} folder
 * @param {Function} callback
 *
 * @return {Promise<void>}
 */
const traverseFolder = (folder, callback) => {
  const files = fs.readdirSync(folder)
  files.forEach((name) => {
    const filepath = path.join(folder, name)
    const filestat = fs.statSync(filepath)

    if (filestat.isFile()) {
      callback(filepath)
    } else {
      traverseFolder(filepath, callback)
    }
  })

  return Promise.resolve()
}

/**
 * 渲染模板
 * @param {String}  template  模板目录, 相对本文件的路径.
 * @param {String}  output    输出目录, 相对本文件的路径.
 * @param {*} data            渲染模板的数据
 * @returns
 */
const renderTemplate = (template, output, data) => {
  const templatePath = path.join(__dirname, template)
  const tempPath = path.join(__dirname, output)

  return traverseFolder(templatePath, (filepath) => {
    const filename = path.relative(templatePath, filepath)
    // 创建项目目录
    if (!fs.existsSync(tempPath)) {
      fs.mkdirSync(tempPath)
    }
    ejs.renderFile(filepath, data, (err, str) => {
      if (err) throw err
      const writeFilePath = path.join(tempPath, filename)
      if (!fs.existsSync(path.dirname(writeFilePath))) {
        fs.mkdirSync(path.dirname(writeFilePath), { recursive: true })
      }
      fs.writeFileSync(writeFilePath, str)
    })
  })
}

const archiverZip = (package, outputFolder, zipname) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(package)) {
      reject('待上传路径不存在')
    }

    if (!fs.statSync(package).isDirectory()) {
      reject('待上传路径不是一个目录')
    }

    const zipFilename = `${zipname}.zip`
    const zipFileRealPath = path.join(__dirname, outputFolder, zipFilename)
    // 如果输出zip包所在的路径不存在 则递归创建目录
    if (!fs.existsSync(path.dirname(zipFileRealPath))) {
      fs.mkdirSync(path.dirname(zipFileRealPath), { recursive: true })
    }

    const output = fs.createWriteStream(zipFileRealPath)
    const archive = archiver('zip', { zlib: { level: 9 } })

    output.on('close', () => resolve())
    output.on('end', () => reoslve())
    output.on('error', (err) => reject(err))

    archive.pipe(output)
    archive.directory(path.resolve(package), false, { date: new Date() })
    archive.finalize()
  })
}

server.use(middleware)
server.use(jsonserver.bodyParser)

server.use('/api', router)

server.post('/generate', async (req, res, next) => {
  const { env, link } = req.body
  const data = { env, link }
  const hash = crypto.createHash('sha256')
  const zipsFolder = 'zips'
  const tempFolder = 'temp'
  const templateFolder = 'template'
  hash.update(`${env}_${link}`)
  const zipname = hash.digest('hex')
  const zipPath = path.join(__dirname, zipsFolder, zipname + '.zip')
  if (!fs.existsSync(zipPath)) {
    await renderTemplate(templateFolder, tempFolder, data)
    const str = fs.readFileSync(
      path.join(__dirname, tempFolder, 'pages', 'index', 'index.wxml')
    )
    await archiverZip(tempFolder, zipsFolder, zipname)
    await del(tempFolder)
    req.url = '/api/zips'
    req.body = {
      filename: `${zipname}.zip`,
      main: str.toString(),
      created: new Date().toLocaleString(),
    }
    return res.app._router.handle(req, res, next)
  } else {
    const db = router.db.__wrapped__
    const result = db.zips.filter((zip) => zip.filename === `${zipname}.zip`)
    res.json(result[0])
  }
})

server.get('/download', (req, res, next) => {
  let { env, link } = req.query
  env = decodeURIComponent(env)
  link = decodeURIComponent(link)

  console.log(env, link)
  const hash = crypto.createHash('sha256')
  hash.update(`${env}_${link}`)
  const zipname = hash.digest('hex')
  const zipsFolder = 'zips'
  const zipPath = path.join(__dirname, zipsFolder, zipname + '.zip')
  res.download(zipPath)
})

server.listen(3001, () => {
  console.log('JSON Server is running.')
})
