  // GiftedChatWithChatkit/MyChat.js
  import React from "react";
  import { GiftedChat } from "react-native-gifted-chat";
  import { f, store } from '../components/firebase';

  export default class MyChat extends React.Component {
    state = {
      messages: [],
      count: 0
    };

    componentWillMount() {
      let thish = this;
      var i = 0;
      store.collection('ichat').doc('test0').collection('chat').get().then(function(querySnapshot) {
        // var arr = [];
        // querySnapshot.forEach(function(doc) {
        //   // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, " => ", doc.data());
        //   var d = {
        //     _id: doc.id,
        //     text:doc.data().text,
        //     createdAt: doc.data().createdAt,
        //     user: {
        //       _id: doc.data()._id,
        //       name: 'React Native',
        //       avatar: doc.data().avatar
        //     }
        //   };
        //   arr.push(d);
        //   thish.setState({
        //     /*messages[i].text = doc.data().text;
        //     console.log('messages[i].text', messages[i].text);
        //     //console.log(doc.data()._id);*/
        //
        //     messages: arr
        //   });
        //   console.log(thish.state.messages);
        // });
      });
}

componentDidMount() {
  //
  //if (this.state.count !== 0)
  console.log('component did mount is called ');

  var thish = this;
  store.collection('ichat').doc('test0').collection('chat')
  .onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
        var arr = thish.state.messages;
          if (change.type === "added") {
               console.log(" New doc: ", change.doc.id);

               // var arr = [];

                 // doc.data() is never undefined for query doc snapshots
                 //console.log(change.doc.id, " => ", change.doc.data());
                 var d = {
                   _id: change.doc.id,
                   text: change.doc.data().text,
                   createdAt: change.doc.data().createdAt,
                   user: {
                     _id: change.doc.data()._id,
                     name: 'React Native',
                     avatar: change.doc.data().avatar
                   }
                 };
                 arr.push(d);
                 thish.setState({
                   /*messages[i].text = doc.data().text;
                   console.log('messages[i].text', messages[i].text);
                   //console.log(doc.data()._id);*/

                   messages: arr
                 });
                 console.log(thish.state.messages);


              //var source = change.doc.metadata.hasPendingWrites ? "Local" : "Server";
              //console.log(source, " data: ", change.doc.data());

              //console.log(doc.id, " => ", doc.data());
          /*    var d = {
                _id: change.doc.id,
                text: change.doc.data().text,
                createdAt: change.doc.data().createdAt,
                user: {
                  _id: change.doc.data()._id,
                  name: 'React Native',
                  avatar: change.doc.data().avatar
                }
              };
              var joined = thish.state.messages.concat(d);

              //arr.push(d);
              thish.setState({
                /*messages[i].text = doc.data().text;
                console.log('messages[i].text', messages[i].text);
                //console.log(doc.data()._id);*/

    /*            messages: joined
              });
              //console.log(thish.state.messages);   */
          }
          if (change.type === "modified") {
              //console.log("Modified city: ", change.doc.data());
              //console.log(" New doc: ", change.doc.id);
          }
          if (change.type === "removed") {
              //console.log("Removed city: ", change.doc.data());
          }
      });
  });
}


  /*        this.setState({
          messages: [
          {
          _id: 1,
          text: 'Hello everyone! naandha unga MG anna pesren!',
          //createdAt: new Date(),
          createdAt: 'Mon Nov 11 2019 13:22:44 GMT+0530 (India Standard Time)',
          user: {
          _id: 1,
          //name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any'
        }
      },
      {
      _id: 3,
      text: 'Hello e unga MG anna pesren!',
      //createdAt: new Date(),
      createdAt: 'Mon Nov 11 2019 13:22:44 GMT+0530 (India Standard Time)',
      user: {
      _id: 1,
      //name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any'
    }
  },
      {
      _id: 2,
      text: 'Hello everyone! ',
      createdAt: new Date(),
      user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any'
    }
  }
  ]
  });
  console.log(this.state);
*/

  // this.setState({
  //   messages: [
  // {
  //       _id: 1,
  //       text: 'Hello everyone! naandha unga MG anna pesren!',
  //       //createdAt: new Date(),
  //       createdAt: 'Mon Nov 11 2019 13:22:44 GMT+0530 (India Standard Time)',
  //   user: {
  //         _id: 1,
  //         //name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any'
  //       }
  //     },
  //     {
  //           _id: 2,
  //           text: 'Hello everyone! ',
  //           createdAt: new Date(),
  //       user: {
  //             _id: 2,
  //             name: 'React Native',
  //             avatar: 'https://placeimg.com/140/140/any'
  //           }
  //         }
  //   ]
  // });
  // console.log(this.state);


  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
    console.log(JSON.stringify(messages));
    var msg = messages;
    // let data = {
    //   name: 'Los Angeles',
    //   state: 'CA',
    //   country: 'USA'
    // };

    console.log('messages', messages);
    console.log('ge');
    var rv = {}

    for (var i = 0; i < messages.length; i++) {

      rv['text'] = messages[i].text;
      rv['_id'] = messages[i].user._id;
        rv['createdAt'] = messages[i].createdAt;
      rv['avatar'] = 'https://placeimg.com/140/140/any';

      console.log('rv[i]', rv[i]);
    }

    console.log(rv);
    console.log('be');
    console.log(messages[0].text);
    console.log(messages[0].user._id);
    console.log(messages[0].id);


    let setDoc = store.collection('ichat').doc('test0').collection('chat').doc()
    .set(rv);
    console.log('rv is set');

  //  console.log('data', data);
    console.log('messages', messages);
    console.log(this.state.messages);
  }


  render() {
    console.log('render called');



    //console.log('count', count);

  /*  store.collection('ichat').doc('test0').collection('chat')
    .onSnapshot(function(querySnapshot) {
        //var cities = [];
        querySnapshot.forEach(function(doc) {
            //cities.push(doc.data().name);
            console.log('doc data', doc.data());
        });
        //console.log("Current cities in CA: ", cities.join(", "));
    }); */
  //  console.log(this.state.count);



  if (this.state.count === 0){
  // this.setState({
  //   count: 1
  // });
  }
  console.log(this.state.count);
    return <GiftedChat messages={this.state.messages}
    onSend={messages => this.onSend(messages)}
    user={{
      _id: 1,
    }}
    />;
  }
  }
