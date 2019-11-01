import superagent from 'superagent'
import cheerio from 'cheerio'
import File from '../utils/file'

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
