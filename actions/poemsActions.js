export const successfullyAddedPoem = payLoad => async dispatch => {
  dispatch({
    type: 'SUCCESSFULLYADDEDPOEM',
    payload: payLoad
  });
};
export const activateDeleteAction = payLoad => async dispatch => {
  dispatch({
    type: 'ACTIVATEDELETE',
    payload: payLoad
  });
};
export const changeAudioStatus = payLoad => async dispatch => {
  dispatch({
    type: 'AUDIO_ADDED',
    payload: payLoad
  });
};
export const uploadVoiceRecording = (
  firestore,
  poem,
  url,
  instagram,
  nav
) => async dispatch => {
  // console.log(poem);
  dispatch({
    type: 'AUDIO_ADDED',
    payload: 'LOADING'
  });

  nav.navigate('Home');
  const { withInstagram, instagramHandle } = instagram;

  console.log(instagram);

  let stemme = poem.stemme ? [...poem.stemme] : [];
  firestore.update(
    {
      collection: 'poems',
      doc: poem.id
    },
    {
      stemme: [
        ...stemme,
        {
          url,
          instagram: withInstagram ? instagramHandle : null,
          date: parseInt((new Date(Date.now()).getTime() / 1000).toFixed(0))
        }
      ]
    }
  );
  // .then(() => {

  //   // this.props.navigation.navigate('Home');
  // });
  dispatch({
    type: 'SUCCESSFULLYADDEDPOEM',
    payload: true
  });
  dispatch({
    type: 'AUDIO_ADDED',
    payload: 'DONE'
  });
};
