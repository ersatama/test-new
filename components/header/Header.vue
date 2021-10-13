<template>
    <div>
      <audio src="/audio/notification.wav" :autoload="true" id="notification" :mute="true"></audio>
      <header class="header">
        <nav class="navbar navbar-expand-lg fixed-top py-3">
          <div class="container-fluid">
            <div class="container p-0">
              <div class="header-reserved d-sm-block d-md-none"></div>
              <a class="navbar-brand text-uppercase font-weight-bold header-text px-0 d-sm-block d-md-none" data-toggle="modal" data-target="#location">
                <span v-if="$store.state.localStorage.city">{{$store.state.localStorage.city.title}}</span>
                <span v-else>Не выбрано</span>
              </a>
              <router-link :to="'/'" class="navbar-brand text-uppercase font-weight-bold header-text px-0 d-none d-md-block">
                MOYKA
              </router-link>
              <div class="header-sign-out d-sm-block d-md-none" v-if="!login" @click="exit"></div>
              <div id="navbarSupportedContent" class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item mx-3 ">
                    <router-link :to="'/home'" class="btn nav-link font-weight-bold font-menu">
                      <div>Категории</div>
                    </router-link>
                  </li>
                  <li class="nav-item mx-3">
                    <router-link :to="'/news'" class="btn nav-link font-weight-bold font-menu">
                      <div>Новости</div>
                    </router-link>
                  </li>
                  <li class="nav-item mx-3">
                    <router-link :to="'/favorite'" class="btn nav-link font-weight-bold font-menu">
                      <div>Избранное</div>
                    </router-link>
                  </li>
                  <li class="nav-item mx-3 account-top" v-show="$store.state.sessionStorage.user">
                    <div class="account account-notification" :class="{'account-notification-on':(notifications.length > 0)}">
                      <div class="account-main">
                        <div class="account-list">
                          <template v-if="notifications.length > 0">
                            <perfect-scrollbar>
                              <div class="notification-items">
                                <div class="notification-item" v-for="(item,key) in notifications" :key="key"  @click="comment(key)" data-toggle="modal" data-target="#comment_modal">
                                  <div class="notification-item-icon" :style="{'background-image':'url('+item.organization.image+')'}"></div>
                                  <div class="notification-item-detail">
                                    <div class="notification-item-detail-title">{{item.organization.title}} • <span v-if="item.organization_tables">{{item.organization_tables.title}}</span></div>
                                    <div class="notification-item-detail-description">{{item.date}} • {{item.time}}</div>
                                  </div>
                                  <div class="notification-item-arr"></div>
                                </div>
                              </div>
                            </perfect-scrollbar>
                          </template>
                          <template v-else>
                            <div class="notification-icon"></div>
                            <div class="notification-title">Уведомлении нет</div>
                          </template>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="nav-item mx-3 account-top">
                    <div class="account account-bag">
                      <div class="account-main">
                        <div class="account-list" v-if="$store.state.sessionStorage.user">
                          <div class="account-info">
                            <div class="account-info-logo">
                              <div>{{$store.state.sessionStorage.user.name[0]}}</div>
                            </div>
                            <div class="account-info-name">{{$store.state.sessionStorage.user.name}}</div>
                          </div>
                          <div class="account-list-items">
                            <router-link :to="'/profile'" class="account-list-item">
                              <div class="account-list-item-icon account-list-item-icon-account"></div>
                              <div class="account-list-item-title">Профиль</div>
                            </router-link>
                            <router-link :to="'/profile/settings'" class="account-list-item">
                              <div class="account-list-item-icon account-list-item-icon-settings"></div>
                              <div class="account-list-item-title">Настройки</div>
                            </router-link>
                            <router-link :to="'/profile/history'" class="account-list-item">
                              <div class="account-list-item-icon account-list-item-icon-history"></div>
                              <div class="account-list-item-title">История бронирований</div>
                            </router-link>
                            <router-link :to="'/profile/payments'" class="account-list-item">
                              <div class="account-list-item-icon account-list-item-icon-payments"></div>
                              <div class="account-list-item-title">Платежи</div>
                            </router-link>
                            <a class="account-list-item" @click="exit">
                              <div class="account-list-item-icon account-list-item-icon-sign_out"></div>
                              <div class="account-list-item-title">Выйти</div>
                            </a>
                          </div>
                        </div>
                        <div class="account-list" v-else>
                          <div class="account-list-title">Добро пожаловать</div>
                          <div class="account-list-items" data-toggle="modal" data-target="#auth_modal">
                            <div class="account-list-item" @click="$store.commit('localStorage/setAuth',true)">
                              <div class="account-list-item-icon account-list-item-icon-account"></div>
                              <div class="account-list-item-title">Войти</div>
                            </div>
                            <div class="account-list-item" @click="$store.commit('localStorage/setAuth',false)">
                              <div class="account-list-item-icon account-list-item-icon-register"></div>
                              <div class="account-list-item-title">Регистрация</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <Auth></Auth>
      <Footer-menu :data="notifications" @setComment="comment"></Footer-menu>
      <comment></comment>
    </div>
</template>

<script>
import Auth from "./auth/Auth";
import FooterMenu from "../../components/footerMenu/FooterMenu";
import Comment from '../../components/modal/comment';
export default {
    name: "Header",
    components: {
        Auth,
        FooterMenu,
        Comment,
    },
    data() {
        return {
            url: 'https://reserved-app.kz',
            login: false,
            user: false,
            countries: [],
            notifications: [],
            item: {},
            status: true,
            settings: {
                suppressScrollY: false,
                suppressScrollX: false,
                wheelPropagation: false
            }
        }
    },
    async created() {
        if (process.browser) {
          await this.auth();
          await this.getCountry();
          this.getBookings();
        }
    },
    mounted() {
        if (process.browser) {
          this.setSocketBookingCompleted();
        }
    },
    methods: {
        setSocketBookingCompleted: function() {
            if (this.user && process.browser) {
                if (window.Echo) {
                    window.Echo.private('booking.notification.'+this.user.id)
                        .listen('.booking.completed', (e) => {
                            this.notification(e);
                        });
                } else {
                    let self    =   this;
                    setTimeout(function() {
                        self.setSocketBookingCompleted();
                    },100);
                }
            }
        },
        comment: function(key) {
            this.item   =   this.notifications[key];
            this.$store.commit('localStorage/setBooking',this.item);
            this.$store.commit('localStorage/setModal',true);
            this.$store.commit('localStorage/setSidebarShow',false);
        },
        notification: function(data) {
            let status  =   true;
            let index   =   0;
            let remove  =   -1;
            if (data.booking.status === 'COMPLETED') {
                this.notifications.forEach(element => {
                    if (element.id === data.booking.id) {
                        status  =   false;
                        if (data.booking.comment === 'off') {
                            remove  =   index;
                        }
                    }
                    index++;
                });
                if (status && !this.$store.state.localStorage.notifications.includes(data.booking.id)) {
                    this.notifications.unshift(data.booking);
                    this.$store.commit('localStorage/addNotifications',data.booking.id);
                    this.play();
                } else if (remove > -1) {
                    this.notifications.splice(remove,1);
                }
            } else if (data.booking.status === 'off') {
                this.notifications.forEach(element => {
                    if (element.id === data.booking.id) {
                        remove  =   index;
                    }
                    index++;
                });
                this.notifications.splice(remove,1);
            }
            this.$store.commit('localStorage/setSidebarNotifications',this.notifications.length);
        },
        play: function(play = true) {
            if (play && this.user.push_notification === 'on') {
                document.getElementById('notification').play();
            }
        },
        getBookings: function() {
            if (this.user && this.status) {
                this.status =   false;
                this.$axios.get('/api/booking/completed/'+this.user.id,{
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }).then(response => {
                    let data    =   response.data;
                    if (data.hasOwnProperty('data')) {
                        let arr =   [];
                        let play    =   false;
                        for (let i = 0; i< data.data.length; i++) {
                            arr.push(data.data[i]);
                            if (!this.$store.state.localStorage.notifications.includes(data.data[i].id)) {
                                this.$store.commit('localStorage/addNotifications',data.data[i].id);
                                play    =   true;
                            }
                        }
                        this.notifications  =   arr;
                        this.$store.commit('localStorage/setSidebarNotifications',arr.length);
                        this.status =   true;
                        this.play(play);
                    }
                }).catch(error => {
                    this.status =   true;
                });
            }
        },
        getCountry: async function () {
            if (this.$store.state.sessionStorage.countries.length === 0) {
                await this.$axios.get(this.url+'/api/countries/',{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        let data = response.data;
                        if (data.hasOwnProperty('data')) {
                            data = data.data;
                            this.countries = data;
                            this.$store.commit('sessionStorage/setCountries',data);
                            this.$store.commit('localStorage/setCity',this.countries[0].city_id[0]);
                            $('#location').modal('toggle');
/*                            if (localStorage.getItem('vrs_') === null) {
                                this.$store.state.localStorage.city = this.countries[0].city_id[0];
                                $('#location').modal('toggle');
                            } else {
                                let vrs_    =   JSON.parse(localStorage.getItem('vrs_'));
                                if (!localStorage.getItem('location')) {
                                    localStorage.location   =   true;

                                }
                            }*/
                        }
                    }).catch(error => {
                        console.log(error.response);
                    });
            } else {
                this.countries = this.$store.state.sessionStorage.countries;
                if (this.$store.state.localStorage.city === '') {
                    this.$store.commit('localStorage/setCity',this.countries[0].city_id[0]);
                    $('#location').modal('toggle');
                }
            }
        },
        view: function(index) {
            this.$store.state.localStorage.sidebar.view   =   index;
            this.$store.state.localStorage.sidebar.show   =   true;
        },
        exit: function() {
            this.login  =   true;
            this.user   =   false;
            this.$store.commit('localStorage/setToken','');
            this.$store.commit('sessionStorage/setUser',false);
            this.$router.push('/home');
        },
        auth: async function () {
            if (this.$store.state.localStorage.token) {
                if (this.$store.state.sessionStorage.user) {
                    this.user = this.$store.state.sessionStorage.user;
                } else {
                    await this.$axios.get(this.url+'/api/token/' + this.$store.state.localStorage.token, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => {
                            let data = response.data;
                            if (data.hasOwnProperty('data')) {
                                this.$store.commit('sessionStorage/setUser',data.data);
                                this.user = this.$store.state.sessionStorage.user;
                            }
                        }).catch(error => {
                            this.login = true;
                            this.$store.commit('localStorage/setToken','');
                        });
                }
            } else {
                this.login = true;
            }
        }
    }
}
</script>

<style lang="scss">
    @import '../../assets/header/header.scss';
.btn {
    outline: none !important;
    box-shadow: none !important;
}

.btn-menu {
    & > a {
        padding-right: 15px !important;
        position: relative;
        cursor: pointer;
        &:after {
            content: '';
            position: absolute;
            width: 8px;
            height: 8px;
            border: 2px solid #fff;
            border-top: none;
            border-left: none;
            border-radius: 2px;
            right: 0;
            top: 16px;
            transform: rotate(45deg);
        }
    }
}
.btn, .btn-group {
    outline: none;
}
.register-btn {
    border-radius: 100px;
    text-align: center;
}
.font-menu {
    font-size: 14px;
    font-weight: 500;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    & > div {

    }
    &-item {
        color: #000;
        font-weight: normal;
        &:hover, &:active {
            background-color: #4ca1af;
            color: #FFF;
        }
    }
}
.logo {
    font-weight: bold;
    width: 34px;
    height: 34px;
    border-radius: 20px;
    margin: 0 2px 0 0;
    border: none;
    background: #fff;
    color: #2193b0;
    &-blue {
        background: #2193b0;
        color: #fff;
    }
}
@media only screen and (max-width : 992px) {
    .logo {
        background: #2193b0 !important;
        color: #fff !important;
        &-text {
            color: #2193b0;
        }
    }
}
.btn-register {
    background: #FF8008;
}
.navbar {
    transition: all 0.4s;
}

.navbar .nav-link {
    color: #fff;
}

.navbar .nav-link:hover,
.navbar .nav-link:focus {
    color: #fff;
    text-decoration: none;
}

.navbar .navbar-brand {
    color: #fff;
}


/* Change navbar styling on scroll */
.navbar.active {
    background: #fff;
    box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar.active .nav-link {
    color: #555;
}

.navbar.active .nav-link:hover,
.navbar.active .nav-link:focus {
    color: #555;
    text-decoration: none;
}

.navbar.active .navbar-brand {
    color: #555;
}


/* Change navbar styling on small viewports */
@media (max-width: 991.98px) {
    .navbar {
        background: #fff;
    }

    .navbar .navbar-brand, .navbar .nav-link {
        color: #555;
    }
}



/*
*
* ==========================================
* FOR DEMO PURPOSES
* ==========================================
*
*/
.text-small {
    font-size: 0.9rem !important;
}


body {

}
</style>
