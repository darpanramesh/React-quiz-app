import React from 'react'
import {quiz} from '../config/function'
import Input from '../component/inputValue'
import Button from '../component/Button'
import SimpleMenu from '../component/topMenu'
import logout from '../logout.png'
import Menu from '../menus.png'


export default class Home extends React.Component {
    constructor(){
        super();
        this.state = { time: {}, seconds: 600 ,quiz:"",startQuiz:false,num:0,result:0,getRes:false,resfail:false};
        this.timer = 0;
        this.countDown = this.countDown.bind(this);
      }

      secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));
    
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
    
        let obj = {
          "h": hours,
          "m": minutes,
          "s": seconds
        };
        return obj;
      }

      async componentDidMount(){
        let {num} = this.state;
        let quizValue = await quiz();
        console.log(quizValue);
        this.setState({
            quiz: quizValue.results,
            allAnswer :quizValue.results[num].incorrect_answers
        })
        
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
    }
    
    start(){
        this.setState({startQuiz:true,result:0});
        if (this.timer == 0 && this.state.seconds > 0) {
          this.timer = setInterval(this.countDown, 1000);
        }
    }
    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
          time: this.secondsToTime(seconds),
          seconds: seconds,
        });
        
        // Check if we're at zero.
        if (seconds == 0) { 
          clearInterval(this.timer);
        }
      }
      next(){
          const {num, quiz,optvalue,result} = this.state;
        console.log(this.state.quiz[num].incorrect_answers);

          if(num < 9){
            this.setState({
                num: num + 1,
                allAnswer : quiz[num  + 1].incorrect_answers
            })
        }
        else{
            this.setState({
                getRes:true,
                startQuiz:false,
                num:0,time: {}, seconds: 600 ,
            })
            alert("get your result");
        }
        if(optvalue == quiz[num].correct_answer){
            this.setState({
                result:result+5
            })
        }
        else{
            this.setState({
                result:result,
            })
        }

        let res= result * 100 /50;
        console.log(res)
        if(res >= 50){
            this.setState({
                resfail:true,
                percent:res,
            })
        }
        else{
            this.setState({
                resfail:false,
                percent:res,
            })
        }

        console.log(optvalue,quiz[num].correct_answer,"REsult==>",result)
      }
    render() {
        const {quiz,num ,startQuiz,getRes,resfail} = this.state;
        return (
            <div>
                <SimpleMenu img={this.props.img} value={this.props.log}  menu={Menu} />
                {startQuiz ? 
                
                <div className="introQuiz">
                <div style={{marginLeft:"60%"}}>
                    <b>Time Left: </b> {this.state.time.m} : {this.state.time.s}
                </div>
                <div className="ques">
                    <h2>{quiz && quiz[num].question}</h2>
                    <div style={{width:"98%"}}>
                    {/* {quiz && allAnswer.map((val,ind)=>
                    <Input  value={val} />)} */}
                    
                    <Input onclick={e => this.setState({optvalue:e.target.value})}  value={quiz && quiz[num].correct_answer} />
                    <Input onclick={e => this.setState({optvalue:e.target.value})}  value={quiz && quiz[num].incorrect_answers[0]} />
                    <Input onclick={e => this.setState({optvalue:e.target.value})}  value={quiz && quiz[num].incorrect_answers[1]} />
                    <Input onclick={e => this.setState({optvalue:e.target.value})}  value={quiz && quiz[num].incorrect_answers[2]} />
                    <br />
                    </div>
                    </div>
                    <span style={{marginLeft:"70%"}}><Button val="Next" next={this.next.bind(this)} /></span>
                </div>

                :
                
                <div className="introQuiz">
                    <span className="introQuizS1">Welcome to Thar Quiz</span>
                    <span className="introQuizS2">Class Name: Tiger Batch 01</span>

                {getRes ? 
                        <div className="disc" style={{minHeight: "0px",height: "auto",transitionDuration: "214ms"}}>
                        <div style={{display:"flex"}}>
                        <div style={{padding:10,width:"100%",border:"1px solid gray",borderRadius:5}}>
                            <h2 style={{textAlign:"center",background:"#13a89e",padding:"20px 10px",borderRadius:5,width:500}}>Description About Result</h2>
                            {resfail ?
                            <div style={{display:"flex",padding:"10px 35px 50px",}}>
                                <div style={{width:"100%",marginTop:"1%",textAlign:"center"}}>
                                    <b style={{color:"#13a89e",fontSize:"1.5em"}}>Congratulation! You are Passed</b>
                                     <br />
                                     <b>Your Test Score is {this.state.percent}%</b>
                                </div>
                            </div>
                            :
                            <div style={{display:"flex",padding:"10px 35px 50px",}}>
                                <div style={{width:"100%",marginTop:"1%",textAlign:"center"}}>
                                    <b style={{color:"red",fontSize:"1.5em"}}>Sorry! You are Failed</b>
                                     <br />
                                     <b>Your Test Score is {this.state.percent}%</b>
                                </div>
                            </div>
                            }
                            <div style={{marginLeft:"40%"}}>
                            <Button val="Re take" next={this.start.bind(this)} />
                            <Button val="LogOut" next={this.props.logout} />
                            </div>
                        </div>
                        </div>                
                        </div>
                        :

                <div className="disc" style={{minHeight: "0px",height: "auto",transitionDuration: "214ms"}}>
                <div style={{display:"flex"}}>
                <div style={{width:"100%",border:"1px solid gray"}}>
                    <h2 style={{textAlign:"center",background:"#13a89e",padding:"10px 5px",borderRadius:5}}>Description About Quiz</h2>
                    <div style={{display:"flex",padding:"10px 35px 35px",}}>
                        <div style={{width:"98%",marginTop:"1%"}}>
                            <b>Description : </b>
                            First Quiz for General Knowledge 
                        </div>
                        <div style={{width:"98%",marginTop:"1%"}}>
                            <b>Passing Score : </b>
                            60
                        </div>
                        <div style={{width:"98%",marginTop:"1%"}}>
                        <b>Quiz Duration : </b> 10 Minutes   
                        </div>
                    </div>
                    <div style={{marginLeft:"40%"}}>
                    <Button val="Start" next={this.start.bind(this)} />
                    </div>
                </div>
                </div>                
                </div>



                }
                </div>
                }

            </div>
        )
    }
}