import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  view: {
    marginVertical: 20,
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginVertical: 20,
    opacity: 0.8,
    marginBottom: 40,
  },
  button: {
    width: 235,
    marginBottom: 25,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  leaveButton: {
    width: 235,
    marginTop: 40,
    backgroundColor: 'red',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  createButton: {
    width: 260,
    borderRadius: 15,
  },
  safeArea: {
    backgroundColor: 'white',
    marginTop: 1,
    marginBottom: 40,
    height: 100 + '%',
    width: 100 + '%',
  },
  nothingYet: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 30,
  },
  loading: {
    marginTop: 30,
  },
});
