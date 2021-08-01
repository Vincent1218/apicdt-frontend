import React from 'react'
import './css/Bracket.css';
import Footer from '../components/Footer'
import logo from '../assets/image/yatai 10th logo700.png';

const Bracket = () => {
  return (
      <div className="containerBracket mainBlockBracket">
        <div className="AB">
            <div>&nbsp;</div><div><span>东吴大学</span></div><div className="groupName">&nbsp;</div>
            <div>A</div><div>苏州大学</div><div className="groupName">&nbsp;</div>
            <div>&nbsp;</div><div>UCSI大学</div><div className="groupName">A</div>
            <div>&nbsp;</div><div>墨尔本大学</div><div className="groupName">B</div>
            <div>B</div><div>中国政法大学</div><div className="groupName">&nbsp;</div>
            <div>&nbsp;</div><div>复旦大学</div><div className="groupName">&nbsp;</div>
          </div>
          <div className="CD">
            <div>&nbsp;</div><div>马来亚大学</div><div className="groupName">&nbsp;</div>
            <div>C</div><div>上海对外经贸大学</div><div className="groupName">&nbsp;</div>
            <div>&nbsp;</div><div>汕头大学</div><div className="groupName">C</div>
            <div>&nbsp;</div><div>香港科技大学</div><div className="groupName">D</div>
            <div>D</div><div>北京大学</div><div className="groupName">&nbsp;</div>
            <div>&nbsp;</div><div>莫纳什大学</div><div className="groupName">&nbsp;</div>
          </div>
          <div className="EF">
            <div>&nbsp;</div><div>中国人民大学</div><div className="groupName">&nbsp;</div>
            <div>E</div><div>多媒体大学 <small>（马六甲分校）</small></div><div className="groupName">&nbsp;</div>
            <div>&nbsp;</div><div>爱丁堡大学</div><div className="groupName">E</div>
            <div>&nbsp;</div><div>新加坡国立大学</div><div className="groupName">F</div>
            <div>F</div><div>大连理工大学</div><div className="groupName">&nbsp;</div>
            <div>&nbsp;</div><div>长安大学</div><div className="groupName">&nbsp;</div>
          </div>
          <div className="GH">
            <div className="groupName">&nbsp;</div><div>马来西亚理科大学(总院校)</div><div>&nbsp;</div>
            <div className="groupName">&nbsp;</div><div>中央民族大学</div><div>G</div>
            <div className="groupName">G</div><div>香港浸会大学</div><div>&nbsp;</div>
            <div className="groupName">H</div><div>澳大利亚国立大学</div><div>&nbsp;</div>
            <div className="groupName">&nbsp;</div><div>山东大学</div><div>H</div>
            <div className="groupName">&nbsp;</div><div>华南理工大学</div><div>&nbsp;</div>
          </div>
          <div className="IJ">
            <div className="groupName">&nbsp;</div><div>清华大学</div><div>&nbsp;</div>
            <div className="groupName">&nbsp;</div><div>马来西亚工艺大学</div><div>I</div>
            <div className="groupName">I</div><div>澳门大学</div><div>&nbsp;</div>
            <div className="groupName">J</div><div>多伦多大学</div><div>&nbsp;</div>
            <div className="groupName">&nbsp;</div><div>西南政法大学</div><div>J</div>
            <div className="groupName">&nbsp;</div><div>西安交通大学</div><div>&nbsp;</div>
          </div>
          <div className="KL">
            <div className="groupName">&nbsp;</div><div>武汉大学</div><div>&nbsp;</div>
            <div className="groupName">&nbsp;</div><div>香港树仁大学</div><div>K</div>
            <div className="groupName">K</div><div>新加坡南洋理工大学</div><div>&nbsp;</div>
            <div className="groupName">L</div><div>世新大学</div><div>&nbsp;</div>
            <div className="groupName">&nbsp;</div><div>北京交通大学</div><div>L</div>
            <div className="groupName">&nbsp;</div><div>剑桥大学</div><div>&nbsp;</div>
          </div>
          <div className="Final">
            <img src= {logo} />
          </div>
          <div className="SemiFinalOne">
            <div>&nbsp;</div><div>&nbsp;</div><div>&nbsp;</div>
            <div className="bracketSemiFinalTitleOne"><span>半决赛1</span></div>
            <div className="bracketPromotedTeam"><span>晋级队伍1</span></div><div>&nbsp;</div><div className="bracketPromotedTeam"><span>晋级队伍4</span></div>
          </div>
          <div className="SemiFinalTwo">
            <div>&nbsp;</div><div>&nbsp;</div><div>&nbsp;</div>
            <div>&nbsp;</div><div className="bracketSemiFinalTitleTwo"><span>半决赛2</span></div><div>&nbsp;</div>
            <div className="bracketPromotedTeam"><span>晋级队伍2</span></div><div>&nbsp;</div><div className="bracketPromotedTeam"><span>晋级队伍3</span></div>
          </div>
          <div className="RoundTwoOne">
            <div className="bracket6C4"><span>6进4排位赛（左）</span></div>
            <div className="bracketPromotedTeam"><span>晋级队伍1</span></div>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <div className="bracketPromotedTeam"><span>晋级队伍2</span></div>
          </div>
          <div className="RoundTwoTwo">
            <div className="bracket6C4"><span>6进4排位赛（右）</span></div>
            <div className="bracketPromotedTeam"><span>晋级队3</span></div>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <div className="bracketPromotedTeam"><span>晋级队伍4</span></div>
          </div>
        {/* <Footer/> */}
      </div>

  )
}

export default Bracket
