import { StyleSheet } from 'react-native';

// Basic Notion-style page container
export const notionStyle  = StyleSheet.create({

  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    
  },
  whiteText: {
    color: 'white',

  },
  page: {
    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 24,
    height: '100%',

    
  },

  timerHandlerPage: {
    justifyContent: 'space-evenly',
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
   blockTextLarge: {
    fontSize: 24,
    lineHeight: 24,
    color: '#191919',
    paddingVertical: 4,
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
});