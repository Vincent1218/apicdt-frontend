import React from 'react'
import './css/RaffleResult.css';
import './css/match.css';
import Footer from '../components/Footer'

const RaffleResult = () => {
  return (
    <div>
      <div className="raffleResult mainBlockBracket">
        <div>
          <div className="raffleTitle"> 辩题抽签结果</div>
        </div>
        <div>
          <div className="raffleSubTitle">正赛</div>
        </div>
        <div className="tableheader">循环赛</div>
        <table className="matchTable">
          <tbody>
          <tr>
            <td rowspan="4" className="group">AB</td>
            <td rowspan="4" className="category">政治法律</td>
            <td rowspan="2" className="serial">A</td>
            <td className="topic topica">正：低度开发国家应该优先发展基建</td>
          </tr>
          <tr>
           <td className="topic topicb">反：低度开发国家应该优先发展教育</td>
          </tr>
          <tr>
            <td rowspan="2" className="serial">B</td>
            <td className="topic topica">正：&ldquo;甜心宝贝&rdquo;平台应该被合法化</td>
          </tr>
          <tr>
            <td className="topic topicb">反：&ldquo;甜心宝贝&rdquo;平台不应该被合法化</td>
          </tr>
          <tr>
            <td rowspan="4" className="group">CD</td>
            <td rowspan="4" className="category">时事热点</td>
            <td rowspan="2" className="serial">C</td>
            <td className="topic topica">正：新加坡政府应该推行疫苗护照</td>
          </tr>
          <tr>
            <td className="topic topicb">反：新加坡政府不应该推行疫苗护照</td>
          </tr>
          <tr>
            <td rowspan="2" className="serial">D</td>
            <td className="topic topica">正：推广人造肉利大于弊</td>
          </tr>
          <tr>
            <td className="topic topicb">反：推广人造肉弊大于利</td>
          </tr>
          <tr>
            <td rowspan="4" className="group">EF</td>
            <td rowspan="4" className="category">文化艺术</td>
            <td rowspan="2" className="serial">E</td>
            <td className="topic topica">正：文化先行更有利于文化的海外传播</td>
          </tr>
          <tr>
            <td className="topic topicb">反：经济先行更有利于文化的海外传播</td>
          </tr>
          <tr>
            <td rowspan="2" className="serial">F</td>
            <td className="topic topica">正：用现代化方法改革传统艺术，对其发扬利大于弊</td>
          </tr>
          <tr>
           <td className="topic topicb">反：用现代化方法改革传统艺术，对其发扬弊大于利</td>
          </tr>
          <tr>
            <td rowspan="4" className="group">GH</td>
            <td rowspan="4" className="category">科技创新</td>
            <td rowspan="2" className="serial">G</td>
            <td className="topic topica">正：当今科技发展加剧社会不平等</td>
          </tr>
          <tr>
            <td className="topic topicb">反：当今科技发展减缓社会不平等</td>
          </tr>
          <tr>
            <td rowspan="2" className="serial">H</td>
            <td className="topic topica">正：脑机接口技术是人类之福</td>
          </tr>
          <tr>
           <td className="topic topicb">反：脑机接口技术是人类之祸</td>
          </tr>
          <tr>
            <td rowspan="4" className="group">IJ</td>
            <td rowspan="4" className="category">社会风潮</td>
            <td rowspan="2" className="serial">I</td>
            <td className="topic topica">正：社交媒体公司正在变相操控世界</td>
          </tr>
          <tr>
           <td className="topic topicb">反：社交媒体公司未在变相操控世界</td>
          </tr>
          <tr>
            <td rowspan="2" className="serial">J</td>
            <td className="topic topica">正：批判主流审美会让审美更多元化</td>
          </tr>
          <tr>
           <td className="topic topicb">反：批判主流审美会让审美更单一化</td>
          </tr>
          <tr>
            <td rowspan="4" className="group">KL</td>
            <td rowspan="4" className="category">青年教育</td>
            <td rowspan="2" className="serial">K</td>
            <td className="topic topica">正：重仪式感的教养对孩子成长利大于弊</td>
          </tr>
          <tr>
           <td className="topic topicb">反：重仪式感的教养对孩子成长弊大于利</td>
          </tr>
          <tr>
            <td rowspan="2" className="serial">L</td>
            <td className="topic topica">正：全面推行儿童无性别教育正当其时</td>
          </tr>
          <tr>
            <td className="topic topicb">反：全面推行儿童无性别教育时机未到</td>
          </tr>
          </tbody>
        </table>

        <div className="tableheader">12进6淘汰赛</div>
        <table className="matchTable">
          <tbody>
            <tr>
            <td rowspan="2" className="category">价值型</td>
            <td rowspan="2" className="group">AB</td>
            <td className="topic topica">正：科技是自由意志的牢笼</td>
            </tr>
            <tr>
            <td className="topic topicb">反：科技是自由意志的羽翼</td>
            </tr>
            <tr>
            <td rowspan="2" className="category">价值型</td>
            <td rowspan="2" className="group">CD</td>
            <td className="topic topica">正：低欲望社会的形成是社会进步的表现</td>
            </tr>
            <tr>
            <td className="topic topicb">反：低欲望社会的形成是社会退步的表现</td>
            </tr>
            <tr>
            <td rowspan="2" className="category">事实型</td>
            <td rowspan="2" className="group">EF</td>
            <td className="topic topica">正：应该以侵权为由遏止短视频二创的疯狂增长</td>
            </tr>
            <tr>
            <td className="topic topicb">反：不应该以侵权为由遏止短视频二创的疯狂增长</td>
            </tr>
            <tr>
            <td rowspan="2" className="category">价值型</td>
            <td rowspan="2" className="group">GH</td>
            <td className="topic topica">正：当代文学作品在翻译时，应该支持译者的&ldquo;创造性叛逆&rdquo;</td>
            </tr>
            <tr>
            <td className="topic topicb">反：当代文学作品在翻译时，不应该支持译者的&ldquo;创造性叛逆&rdquo;</td>
            </tr>
            <tr>
            <td rowspan="2" className="category">事实型</td>
            <td rowspan="2" className="group">IJ</td>
            <td className="topic topica">正：后疫情时代加速了全球化趋势</td>
            </tr>
            <tr>
            <td className="topic topicb">反：后疫情时代减缓了全球化趋势</td>
            </tr>
            <tr>
            <td rowspan="2" className="category">事实型</td>
            <td rowspan="2" className="group">KL</td>
            <td className="topic topica">正：选举后，民选议员跳槽应该接受法律制裁</td>
            </tr>
            <tr>
            <td className="topic topicb">反：选举后，民选议员跳槽不应该接受法律制裁</td>
            </tr>
          </tbody>
        </table>

        <div className="tableheader">6进4排位赛</div>
        <table className="matchTable">
          <tbody>
          <tr>
          <td rowspan="2" className="serial">M</td>
          <td className="topic topica">正：积极冲浪是后真相时代更好的生存之道</td>
          </tr>
          <tr>
          <td className="topic topicb">反：远离喧嚣是后真相时代更好的生存之道</td>
          </tr>
          <tr>
          <td rowspan="2" className="serial">N</td>
          <td className="topic topica">正：艺术作品评级对艺术文化发展利大于弊</td>
          </tr>
          <tr>
          <td className="topic topicb">反：艺术作品评级对艺术文化发展弊大于利</td>
          </tr>
          </tbody>
        </table>

        <div className="tableheader">半决赛</div>
        <table className="matchTable">
          <tbody>
          <tr>
          <td rowspan="2" className="serial">O1</td>
          <td className="topic topica">正：无用之用方为大用</td>
          </tr>
          <tr>
          <td className="topic topicb">反：有用之用方为大用</td>
          </tr>
          <tr>
          <td rowspan="2" className="serial">O2</td>
          <td className="topic topica">正：喜剧贵在引人发笑</td>
          </tr>
          <tr>
          <td className="topic topicb">反：喜剧贵在引人思考</td>
          </tr>
          </tbody>
        </table> 

        <div className="tableheader">决赛</div>
        <table className="matchTable">
          <tbody>
          <tr>
          <td rowspan="2" className="serial">P1</td>
          <td className="topic topica">正： 把人生看作一幅蓝图的人生态度更应该被追求</td>
          </tr>
          <tr>
          <td className="topic topicb">反： 把人生看作一场冒险的人生态度更应该被追求</td>
          </tr>
          </tbody>
        </table>  
          
        <div>
          <div className="raffleSubTitle1"> 返尔赛</div>
        </div>
          <div className="containerOne">
            <div className="RaffleResultTableHeader">
              <span>初赛</span>
            </div>
            <div className="AB">
              <div className="A">正：所爱隔山海，山海皆可平</div>
              <div className="B">反：所爱隔山海，山海不可平</div>
            </div>
            <div className="CD">
              <div className="C">正：笑傲江湖必当武功盖世</div>
              <div className="D">反：笑傲江湖不必当武功盖世</div>
            </div>
            <div className="EF">
              <div className="E">正：距离感是维持当代伴侣关系的解药</div>
              <div className="F">反：距离感是维持当代伴侣关系的毒药</div>
            </div>
            <div className="GH">
              <div className="G">正：遗憾为青春增色</div>
              <div className="H">反：遗憾让青春失色</div>
            </div>
            <div className="ABHead">AB</div>
            <div className="CDHead">CD</div>
            <div className="EFHead">EF</div>
            <div className="GHHead">GH</div>
          </div>
          <div className="containerTwo">
            <div className="RaffleResultTableHeader">
              <span>半决赛</span>
            </div>
            <div className="I1">
              <div className="I1A">正：社会性死亡是网络谴责可承受之重</div>
              <div className="I1B">反：社会性死亡不是网络谴责可承受之重</div>
            </div>
            <div className="I2">
              <div className="I2A">正：如果牺牲艺术性追求商业化才能让自己的电影叫座，电影从业者应该选择牺牲</div>
              <div className="I2B">反：如果牺牲艺术性追求商业化才能让自己的电影叫座，电影从业者不应该选择牺牲</div>
            </div>
            <div className="I1Head">I1</div>
            <div className="I2Head">I2</div>
          </div>
          <div className="containerThree">
            <div className="RaffleResultTableHeader">
              <span>决赛</span>
            </div>
            <div className="J1">
              <div className="J1A">正：唯心主义更能回应世界</div>
              <div className="J1B">反：唯物主义更能回应世界</div>
            </div>
            <div className="J1Head">J1</div>
          </div>
        </div>
      <Footer/>

    </div>
  )
}

export default RaffleResult
