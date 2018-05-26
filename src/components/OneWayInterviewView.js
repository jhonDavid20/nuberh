import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, AsyncStorage } from 'react-native';

import { Container, Header, Content, Card, CardItem, Body, Text, Toast, Root } from 'native-base';

import ThinkTimeComponent from './ThinkTimeComponent';
import RecordingFooterComponent from './RecordingFooterComponent';
import StartRecordingComponent from './StartRecordingComponent';
import QuestionViewComponent from './QuestionViewComponent';
import GoodbyeView from './GoodbyeView';

import { RNCamera } from 'react-native-camera';

export default class OneWayInterviewView extends Component {
    constructor() {
        super();
        this.state = {
            isRecordingFooterDisplayed: false,
            isRecording: false,
            takesLeft: 3,
            timeLeftPaused: true,
            thinkTimePaused: false,
            currentQuestion: 'Lorem ipsum dolor sit amet, ea nullam utroque pericula sea, id usu oblique efficiendi, vel in fugit ubique laboramus. Inimicus deseruisse nec et.',
            timeLeft: {
                minutes: 5,
                seconds: 0
            },
            thinkTime: {
                minutes: 1,
                seconds: 15
            }, 
            token: null,
            CandidateId: null
        };
    }
    componentDidMount(){
        AsyncStorage.getItem("token").then((value)=>{
            this.setState({token:value});
        }).done();

        AsyncStorage.getItem("CandidateId").then((value)=>{
            this.setState({CandidateId:value});
        }).done();
    }

    OnTimeLeftOver() {
        this.OnNextQuestion();
    }

    OnThinkTimeOver() {
        this.OnStartAnswering();
    }

    componentDidMount() {
        AsyncStorage.getItem("CandidateId").then((CandidateId)=>{
            fetch("https://nuberh.com/api/candidate-mobile/"+CandidateId, {
            method: "GET",
            })
            .then(response => response.json())
            .then(responseJson => {
                let interviews = responseJson.interviews
                for(let i = 0; i < interviews.length; i++) {
                    // La condición tiene que modificarse para que tome la entrevista activa. (&& interviews[i].InterviewUrl != null).
                    if(interviews[i].InterviewType == "Oneway" && interviews[i].InterviewUrl != null) {
                        // The reason why we're using -1 as the currentQuestionIndex here
                        // is mainly because when OnNextQuestion is called it'll sum up one to it.
                        // So the first question will be displayed on screen.
                        let allQuestions = interviews[i].Questions;
                        this.setState({
                            questions: allQuestions,
                            currentQuestionIndex: -1
                        });
                        this.OnNextQuestion();
                        break;
                    }
                }
                this.setState({load:true});
            })
            .catch(error => {
                console.log(error);
            });
        });
        
    }

    // For the Think Time Footer, when the user presses the checkmark to start recording him/herself. 
    OnStartAnswering() {
        console.log(this.state.questions[this.state.currentQuestionIndex].QuestionId);
        this.setState({
            isRecordingFooterDisplayed: true,
            thinkTimePaused: true
        });
    }

    // For the Recording Footer component, when the user presses the checkmark to jump into the next question.
    OnNextQuestion() {
        if(++this.state.currentQuestionIndex == this.state.questions.length) {
            this.props.navigation.navigate('GoodbyeView');
            return;
        }
        
        let nextQuestion = this.state.questions[this.state.currentQuestionIndex]
        this.StopRecordingVideo(nextQuestion.Retake, nextQuestion.Title, this.state.currentQuestionIndex, false);
    }

    OnTakesLeftPressed() {
        if(this.state.takesLeft == 0) {
            Toast.show({
                text: 'You don\'t have any remaining takes-left.',
                buttonText: 'Okay',
                duration: 2500,
                type: 'danger',
                position: 'bottom'
            });
            return;
        }

        if(!this.state.isRecording) {
            Toast.show({
                text: 'Wait until the recording starts.',
                buttonText: 'Okay',
                duration: 2500,
                type: 'warning',
                position: 'bottom'
            });
            return;
        }

        this.StopRecordingVideo(this.state.takesLeft - 1, this.state.currentQuestion, this.state.currentQuestionIndex, true);
    }

    StopRecordingVideo(takesLeft, question, index, takesLeftWasPressed) {
        if(!this.camera) {
            return;
        }

        this.setState({
            isRecordingFooterDisplayed: false,
            isRecording: false,
            takesLeft: takesLeft,
            timeLeftPaused: true,
            thinkTimePaused: false,
            currentQuestion: question,
            takesLeftPressed: takesLeftWasPressed,
            timeLeft: {
                minutes: this.state.questions[index].TimeLimit,
                seconds: 0
            },
            thinkTime: {
                minutes: this.state.questions[index].ThinkTime,
                seconds: 0
            }
        });

        this.camera.stopRecording();
    }

    OnCounterToRecordFinished() {
        this.setState({
            isRecording: true,
            timeLeftPaused: false,
        });

        if(!this.camera) {
            return;
        }

        const options = {
            quality: RNCamera.Constants.VideoQuality["460p"],
            maxDuration: this.state.timeLeft.minutes * 60 + this.state.timeLeft.seconds,
        };

        this.camera.recordAsync(options).then(video => {
            if(this.state.takesLeftPressed) {
                return;
            }

            const videoData = {
                uri: video.uri,
                name: "videopruebapregunta",
                type: "video/mp4"
            };

            const bodyData = new FormData();
            AsyncStorage.getItem("CandidateId").then((CandidateId)=>{
                AsyncStorage.getItem("token").then((token)=>{
                    bodyData.append(CandidateId+"-"+this.state.questions[this.state.currentQuestionIndex].QuestionId, videoData);
                    fetch("https://162.250.73.181/"+CandidateId+"/"+token+"/"+this.state.questions[this.state.currentQuestionIndex].QuestionId, {
                        method: "PUT",
                        body: bodyData,
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Impob25hdGFucG9ydGVzQGhvdG1haWwuY29tIiwiSUQiOiI3MGM5MWVjZC1mM2M1LTRjNWItOTYxYS01MDQ3ZTg0OTVjNjQiLCJuYmYiOjE1MjQ5NTQzOTksImV4cCI6MTUyNTA0MDc5OSwiaWF0IjoxNTI0OTU0Mzk5LCJpc3MiOiJOZWJ1UkgiLCJhdWQiOiJOZWJ1UkgtQXVkaWVuY2UifQ.KdOb6mAlkDVnyYEoWUiIPpTgps8l8mtWV-vJ1n73iPTy115s03UqU7TbVb3QnXvgr61y6l1Anc4DB9El5tMo-mXW0GOQ096nQG-Td3Hrfpj64tLpgJGdCsJy96u0shw6DuH9yotkMFuGdQmI3tgWorKTl3ibcgoMi5JXhC12ZOVC7XYLuaGzdBDaq0kuqcIjjr10UaWd72xJSw2LrC1h1AOQ31Hv9wB4jXVcJoxy-PckUHEhGoAwvrGlFZ1ysbYOeVQDYh2t1Bn_ilwzsnuDH4HSz578t-NlguYRa4bhg7fspX5nq6M26qxqGlho-nUhGFFANhmKfiUy_vkrUo2L6w"
                        }
                    })
                    .then(response => responseJson())
                    .then(response => {
                        console.log("Video was uploaded successfully! :)");
                        console.log(response);
                    })
                    .catch(error => {
                        console.log("Error: " + error);
                    });
                });
              });
           
        }).catch(error => {
            console.log("ERROR: " + error);
        });
    }

    render() {
        let utilsFooter = this.state.isRecordingFooterDisplayed ? 
            <RecordingFooterComponent 
                style={styles.recordingFooterStyle} 
                timeLeftPaused={this.state.timeLeftPaused} 
                OnOverTimeLeft={this.OnTimeLeftOver.bind(this)} 
                OnNextQuestion={this.OnNextQuestion.bind(this)} 
                OnTakesLeftPressed={this.OnTakesLeftPressed.bind(this)}
                leftTime={this.state.timeLeft}
                shouldBlink={!this.state.isRecording}
                Id={1}
                Description={"Pregunta"}/>

            : <ThinkTimeComponent 
                style={styles.thinkTimeStyle} 
                thinkTimePaused={this.state.thinkTimePaused} 
                timeLeftPaused={this.state.timeLeftPaused} 
                OnOverTimeLeft={this.OnTimeLeftOver.bind(this)} 
                OnOverThinkTime={this.OnThinkTimeOver.bind(this)} 
                OnStartAnswering={this.OnStartAnswering.bind(this)}
                thinkTime={this.state.thinkTime}
                leftTime={this.state.timeLeft}
                Id={1}
                Description={"Pregunta"}/>;

        let startRecordingCounter = this.state.isRecordingFooterDisplayed && !this.state.isRecording ? 
            <StartRecordingComponent 
                OnCounterFinished={this.OnCounterToRecordFinished.bind(this)} />
            : <View></View>;

        // Note: The root component is used in order to make the Toasts work correctly.
        let loadView = this.state.load ?
                    <Container style={styles.mainContainer}>
                        <QuestionViewComponent style={styles.questionComponentContainer} question={this.state.currentQuestion}/>
                        {startRecordingCounter}
                        {utilsFooter}
                    </Container>
        :
        <Spinner style={styles.spinner}/>;
        // Note: The root component is used in order to make the Toasts work correctly.
        return (<Root>
                        <RNCamera 
                            ref={(camera) => { this.camera = camera }}
                            permissionDialogTitle={"Permission to use camera"}
                            permissionDialogMessage={"In order to continue, we need your permission to use your camera."}
                            type={RNCamera.Constants.Type.front}
                            style={styles.cameraStyle}
                            captureAudio={true}
                        />
                    {loadingView}
                </Root>);
    }
}
AppRegistry.registerComponent('OneWayInterviewView', () => OneWayInterviewView);

const styles = StyleSheet.create({
    spinner: {
        flex:1,
        justifyContent: 'center'
    },thinkTimeStyle: {

    },
    recordingFooterStyle: {

    },
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cameraStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    }, 
    questionComponentContainer: {
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        height: 100,
        backgroundColor: 'rgba(225, 225, 225, 0.9)',
        margin: 10,
        borderRadius: 5,
        padding: 5
    }
});