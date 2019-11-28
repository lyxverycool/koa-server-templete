import superagent from 'superagent'
import cheerio from 'cheerio'
import File from '../utils/file'
import Logger from '../utils/logger'

class Crawler {
  constructor() { }
  // 爬取腾讯微博
  async getQQWeibo(ctx) {
    try {
      const htmlMsg = await superagent.get('http://t.qq.com/*')
      const $ = cheerio.load(htmlMsg.text)
      let items = []
      $('.msgCnt').each(function (index, ele) {
        const msgCnt = $(ele).text()
        items.push({
          text: msgCnt
        })
      })
      ctx.body = {
        status: '1',
        type: 'success_get_cnblogs',
        message: 'success',
        data: items
      }
    } catch (err) {
      ctx.body = {
        status: '0',
        type: 'error_get_qqweibo',
        message: err.toString()
      }
    }
  }
  // 爬取博客园文章所有标题
  async getCnblogs(ctx) {
    try {
      async function forEachCrawler() {
        let allData = []
        for (var i = 1; i <= 8; i++) {
          const htmlMsg = await superagent.get(
            'https://www.cnblogs.com/*/default.html?page=' + i
          )
          const $ = cheerio.load(htmlMsg.text)
          let items = []
          $('.day').each(function (index, ele) {
            const msgDay = $(ele)
              .find('.dayTitle a')
              .text()
            const msgTitle = $(ele)
              .find('.postTitle a')
              .text()
            const msgHref = $(ele)
              .find('.postTitle a')
              .attr('href')
            items.push({
              day: msgDay,
              title: msgTitle,
              href: msgHref
            })
          })
          allData = allData.concat(items)
        }
        // console.log(allData)
        return allData
      }
      const Datas = await forEachCrawler()
      ctx.body = {
        status: '1',
        type: 'success_get_cnblogs',
        message: 'success',
        data: Datas
      }
    } catch (err) {
      ctx.body = {
        status: '0',
        type: 'error_get_cnblogs',
        message: err.toString()
      }
    }
  }

  //爬去指定作者的诗集
  async getPoetys(ctx) {
    let { author } = ctx.request.query
    author = encodeURIComponent(author)
    try {
      //获取page
      async function getPoetyPage() {
        const htmlMsg = await superagent.get(
          `https://so.gushiwen.org/search.aspx?type=author&page=1&value=${author}`
        )
        const $ = cheerio.load(htmlMsg.text)
        const poetyContent = $('.pagesright span').text().replace(/[^0-9]/ig, "")
        if (poetyContent && poetyContent >= 1) {
          poetyContent
        }
        await File.mkdir(decodeURIComponent(author))
        return poetyContent
      }

      //获取所有内容
      const page = await getPoetyPage()
      async function forEachPeoty() {
        let allData = []
        for (var i = 1; i <= page; i++) {
          const htmlMsg = await superagent.get(
            `https://so.gushiwen.org/search.aspx?type=author&page=${i}&value=${author}`
          )
          const $ = cheerio.load(htmlMsg.text)
          $('.cont').each(function (index, ele) {
            const poetyTitle = $(ele)
              .find('b')
              .text()
            const poetyContent = $(ele)
              .find('.contson')
              .text()
            const title = poetyTitle.replace(/[\r\n]/g, "").replace('/', '')
            if (poetyContent) {
              allData.push({
                poetyTitle: title,
                poetyContent: poetyContent
              })
            }
            logger.info('正在抓取...' + title)
          })
        }
        return allData
      }

      const Datas = await forEachPeoty()

      logger.info('开始写入')
      for (var i = 0; i < Datas.length; i++) {
        const poetyTitle = Datas[i].poetyTitle
        const poetyContent = Datas[i].poetyContent
        await File.writeFile(`${decodeURIComponent(author)}/${poetyTitle}.txt`, poetyContent)
      }

      ctx.body = {
        status: '1',
        type: 'success_get_poetys',
        message: 'success',
        data: 'ok'
      }
    } catch (err) {
      ctx.body = {
        status: '0',
        type: 'error_get_poetys',
        message: err.toString()
      }
    }
  }

  // 爬取知乎图片
  async getZhihuImgs(ctx) {
    try {
      const htmlMsg = await superagent.get('http://daily.zhihu.com/')
      var $ = cheerio.load(htmlMsg.text)
      var items = []
      $('.wrap .preview-image').each(function (index, ele) {
        var element = $(ele)
        items.push(element.attr('src'))
      })
      const msg = await File.downLoadImgs(items)
      ctx.body = {
        status: '1',
        type: 'success_get_zhihuimgs',
        message: msg
      }
    } catch (err) {
      ctx.body = {
        status: '0',
        type: 'error_get_zhihuimgs',
        message: err.message
      }
    }
  }
}
export default new Crawler()
