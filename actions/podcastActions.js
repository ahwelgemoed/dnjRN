import axios from 'axios';

const apiKey = '2b5fc481b91e4defb7858d13e5674281';
let ALLEPS;
export const getHuidig = () => async dispatch => {
  let config = {
    headers: {
      'X-ListenAPI-Key': apiKey
    }
  };
  await axios
    .get(
      'https://listen-api.listennotes.com/api/v2/podcasts/a56c3319d27544dcb6b8c96448da2bd7',
      config
    )
    .then(
      res => (
        (ALLEPS = res.data.episodes),
        dispatch(getTheRest(res.data.next_episode_pub_date)),
        dispatch({
          type: 'GETHUIDIG',
          payload: res.data
        })
      )
    );
};
export const postSelectedEpisode = episode => async dispatch => {
  dispatch({
    type: 'SELECTEDPODCAST',
    payload: episode
  });
};

const getTheRest = date => async dispatch => {
  console.log(date);
  let config = {
    headers: {
      'X-ListenAPI-Key': apiKey
    }
  };
  await axios
    .get(
      `https://listen-api.listennotes.com/api/v2/podcasts/a56c3319d27544dcb6b8c96448da2bd7?next_episode_pub_date=${date}`,
      config
    )
    .then(res => {
      res.data.episodes.map(e => ALLEPS.push(e));
      // ALLEPS.push(res.data.episodes);
      if (res.data.next_episode_pub_date) {
        getTheRest(res.data.next_episode_pub_date);
      }
      dispatch({
        type: 'ALLEPISODES',
        payload: ALLEPS
      });
    })
    .catch(err => console.log(err));
  // console.log(ALLEPS);
};
export const listenToThisEp = episode => async dispatch => {
  dispatch({
    type: 'OPENPLAYER',
    payload: false
  });
  setTimeout(() => {
    dispatch({
      type: 'OPENPLAYER',
      payload: episode
    });
  }, 500);
};
export const closePlayer = () => async dispatch => {
  dispatch({
    type: 'OPENPLAYER',
    payload: false
  });
};
