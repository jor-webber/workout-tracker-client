export const state = () => ({
  id: null,
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  token: null,
  profileCaption: '',
  profilePicture: null,
})

export const getters = {
  getId(state) {
    return state.id;
  },
  getFirstName(state) {
    return state.firstName;
  },
  getLastName(state) {
    return state.lastName;
  },
  getFullName(state) {
    return state.firstName + ' ' + state.lastName;
  },
  getUsername(state) {
    return state.username;
  },
  getEmail(state) {
    return state.email;
  },
  getToken(state) {
    return state.token;
  },
  getRole(state) {
    return state.role;
  },
  getProfileCaption(state) {
    return state.profileCaption;
  }
}

export const mutations = {
  setId(state, id) {
    state.id = id;
  },
  setFirstName(state, firstName) {
    state.firstName = firstName;
  },
  setLastName(state, lastName) {
    state.lastName = lastName;
  },
  setUsername(state, username) {
    state.username = username;
  },
  setEmail(state, email) {
    state.email = email;
  },
  setToken(state, token) {
    state.token = token;
  },
  setProfileCaption(state, caption) {
    state.profileCaption = caption;
  },
  setRole(state, role) {
    state.role = role;
  },
  loginUser(state, user) {
    state.id = user.id
    state.firstName = user.firstName
    state.lastName = user.lastName
    state.username = user.username
    state.email = user.email
    state.token = user.token,
    state.profileCaption = user.profileCaption
    state.role = user.role
    state.profilePicture = user.profilePicture
    const options = {
      maxAge: 60 * 60
    }
    this.$cookies.setAll([
      {
        name: 'id',
        value: state.id,
        opts: options
      },
      {
        name: 'firstName',
        value: state.firstName,
        opts: options
      },
      {
        name: 'lastName',
        value: state.lastName,
        opts: options
      },
      {
        name: 'username',
        value: state.username,
        opts: options
      },
      {
        name: 'email',
        value: state.email,
        opts: options
      },
      {
        name: 'role',
        value: state.role,
        opts: options
      },
      {
        name: 'token',
        value: state.token,
        opts: options
      },
      {
        name: 'profileCaption',
        value: state.profileCaption,
        opts: options
      },
      {
        name: 'profilePicture',
        value: state.profilePicture,
        opts: options
      }
    ])
  },
  giveCookieValues(state, user) {
    state.id = user.id
    state.firstName = user.firstName
    state.lastName = user.lastName
    state.username = user.username
    state.email = user.email
    state.token = user.token,
    state.profileCaption = user.profileCaption
    state.role = user.role
    state.profilePicture = user.profilePicture
  },
  logoutUser(state) {
    state.id = ''
    state.firstName = ''
    state.lastName = ''
    state.username = ''
    state.email = ''
    state.token = null,
    state.profileCaption = ''
    state.role = '',
    state.profilePicture = null
  },
  updateUser(state, user) {
    console.log('update user', user)
    state.firstName = user.firstName
    state.lastName = user.lastName
    state.username = user.username
    state.email = user.email
    state.profileCaption = user.profileCaption
    const options = {
      maxAge: 60 * 60
    }
    this.$cookies.removeAll();
    this.$cookies.setAll([
      {
        name: 'id',
        value: state.id,
        opts: options
      },
      {
        name: 'firstName',
        value: state.firstName,
        opts: options
      },
      {
        name: 'lastName',
        value: state.lastName,
        opts: options
      },
      {
        name: 'username',
        value: state.username,
        opts: options
      },
      {
        name: 'email',
        value: state.email,
        opts: options
      },
      {
        name: 'role',
        value: state.role,
        opts: options
      },
      {
        name: 'token',
        value: state.token,
        opts: options
      },
      {
        name: 'profileCaption',
        value: state.profileCaption,
        opts: options
      },
      {
        name: 'profilePicture',
        value: state.profilePicture,
        opts: options
      }
    ])
  }
}

export const actions = {
  setId({ commit }, id) {
    commit('setId', id);
  },
  setFirstName({ commit }, firstName) {
    commit('setFirstName', firstName);
  },
  setLastName({ commit }, lastName) {
    commit('setLastName', lastName);
  },
  setUsername({ commit }, username) {
    commit('setUsername', username);
  },
  setEmail({ commit }, email) {
    commit('setEmail', email);
  },
  setToken({ commit }, token) {
    commit('setToken', token);
  },
  setRole({commit}, role) {
    commit('setRole', role);
  },
  loginUser({ commit }, user) {
    commit('loginUser', user);
  },
  logoutUser({ commit }) {
    commit('logoutUser');
  },
  giveCookieValues({commit}, user) {
    commit('giveCookieValues', user);
  },
  updateUser({commit}, user) {
    console.log('update user action', user)
    commit('updateUser', user)
  }
}
