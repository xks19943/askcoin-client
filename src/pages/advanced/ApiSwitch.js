/**
 * Created by xiaoming on 2018/3/27.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList
} from 'react-native';
import laBa from '../../resource/icons/chonghzi_laba.png';
import SwipeOut from 'react-native-swipeout';
import SwitchButton from '../../components/SwitchButton';
import ApiPopup from './ApiPopup';
import NavButton from '../../components/NavButton';
import HintCell from '../../components/HintCell';
import AlertControl from '../../components/AlertControl';

export default class ApiSwitch extends Component {

  static navigationOptions = ({navigation})=>{
    const {state} = navigation;
    return {
      headerRight: (
        <NavButton
          data={{
            type:'text',
            text: '添加',
            onPress:()=> {
              state.params.onAdd && state.params.onAdd()
            }
          }}
        />
      )
    };
  };

  data = [
    {
      name:'API服务器节点1',
      isOpen:true,
    },
    {
      name:'API服务器节点2',
      isOpen:false,
    },
    {
      name:'API服务器节点3',
      isOpen:false,
    },
    {
      name:'API服务器节点4',
      isOpen:true,
    },
    {
      name:'API服务器节点5',
      isOpen:true,
    },
    {
      name:'API服务器节点6',
      isOpen:true,
    }
  ];
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.props.navigation && this.props.navigation.setParams({
      onAdd:()=>{
        this.apiPopup && this.apiPopup.open();
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <HintCell hintTitle="向左滑动可以删除节点哦~"/>
        <FlatList
          style={styles.list}
          data={this.data}
          keyExtractor={(item,index)=>index}
          renderItem={({item,index})=>this.renderItem(item,index)}
          ItemSeparatorComponent={()=>this.renderItemSeparator()}/>
        <ApiPopup
          ref={(r)=>this.apiPopup = r}/>
        <AlertControl ref={r=>{this._alert=r}}/>
      </View>
    )
  }

  renderItem(item,index){
    let swipeOutBtns = [
      {
        text: '删除',
        backgroundColor:'#FD808F',
        color:COLOR.whiteColor,
        onPress:()=>{
          this._alert.show({
            desc:'温馨提示',
            title : "非常抱歉您的备份文件失败，请重新选择~",
            titleStyle : {},
            message : '',
            messageStyle : {},
            buttons : [
              {title:'取消'},
              {
                title:'确认',
                onPress:()=>{

                }
              },
            ] ,
          });
        }
      }
    ];
    return(
      <SwipeOut
        autoClose={true}
        backgroundColor={COLOR.whiteColor}
        buttonWidth={45}
        right={swipeOutBtns}>
        <View style={styles.item}>
          <Text style={styles.title}>
            {item.name}
          </Text>
          <SwitchButton
            isOpen={item.isOpen}
            onvaluechange={(isOpen)=>{
              console.log(isOpen)
            }}/>
        </View>
      </SwipeOut>
    )
  }

  renderItemSeparator(){
    return(
      <View style={styles.line}/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  list:{
    backgroundColor:COLOR.bgColor,
    flex:1
  },
  item:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    height:65,
    paddingHorizontal:15,
    width:ScreenWidth
  },
  title:{
    fontSize:FONTSIZE.normal,
    color:COLOR.primaryTextColor
  },
  line:{
    height:1,
    backgroundColor:COLOR.diverColor
  }
});