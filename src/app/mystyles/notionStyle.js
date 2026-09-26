import { StyleSheet } from 'react-native';

// Basic Notion-style page container
export const notionStyle = StyleSheet.create({
  page: {

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 24,
    height: '100%',


  },
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderCurve: 'circular',
    borderRadius: 5,
    width: '100%',
    textAlign: 'center'


  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#191919',
    marginBottom: 8,
    paddingTop: 20,
  },
  blockText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#191919',
    paddingVertical: 4,
  },
  blockTextSmall: {
    fontSize: 16,
    lineHeight: 24,
    color: '#191919',
    paddingVertical: 4,
  },
  blockTextExtraSmall: {
    fontSize: 8,
    lineHeight: 24,
    color: '#191919',
    paddingVertical: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#E9E9E7',
    marginVertical: 16,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  sidebarItemHovered: {
    backgroundColor: '#EFEFEE',
  },
  button: {
   backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  
  },
  buttonPressed: {
    backgroundColor: '#F1F1EF',
  },

});