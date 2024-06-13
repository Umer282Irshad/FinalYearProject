import { StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#234',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  titleText:{
    fontFamily: 'nunito-bold',
    fontSize: 26,
    color:'#cde',
    marginBottom:60,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontFamily: 'nunito-bold',
    width:200,
    height:100,
    marginBottom:25,
    marginTop:10,
    borderRadius: 20,
    backgroundColor: '#0bcc', 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 20, 
  },
  buttonText: {
    fontFamily: 'nunito-bold',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo:{
    height:90,
    width:350,
    flexDirection:'column',
    marginTop:100,
    marginBottom:5
  },
  input:{
    fontFamily: 'nunito-bold',
    backgroundColor:'#fee',
    width:260,
    height:50,
    margin:15,
    marginLeft:30,
    borderRadius:10,
    fontSize:16,
    paddingLeft:15
  },
  errorText:{
    fontFamily: 'nunito-bold',
    color:'white'
  }
});
