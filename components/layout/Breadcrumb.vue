<template>
    <div>
      <location :countries="countries"></location>
      <div class="container-fluid section-bg breadcrumb-main">
        <div class="container py-0">
          <div class="row">
            <div class="col-12 col-md-9 p-0 d-flex align-items-center">
              <ul class="breadcrumb">
                <li>
                  <a href="/">
                    <div class="breadcrumb-home"></div>
                  </a>
                </li>
                <template v-for="(item,key) in breadcrumb">
                  <li>
                    <div class="breadcrumb-arrow"></div>
                  </li>
                  <li class="breadcrumb-link" :key="key">
                    <a :href="'/'+item.link" v-if="item.link">{{item.title}}</a>
                    <a v-else>{{item.title}}</a>
                  </li>
                </template>
              </ul>
            </div>
            <div class="location-main col-md-3 p-0 d-flex justify-content-end">
              <div class="location" id="location" ref="location" data-toggle="modal" data-target="#location">
                <div class="location-title" v-if="$store.state.localStorage.city !== ''">{{$store.state.localStorage.city.title}}</div>
                <div class="location-title" v-else>Не выбрано</div>
                <div class="location-icon"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Location from "../modal/location";
export default {
    name: "Breadcrumb",
    props: ['breadcrumb'],
    components: {
        Location,
    },
    data() {
        return {
            url: 'https://reserved-app.kz',
            countries: [],
        }
    },
    created() {
        if (process.browser) {
            this.getCountry();
        }
    },
    methods: {
        getCountry: function() {
            if (!this.$store.state.sessionStorage.countries) {
                this.$axios.get(this.url+'/api/countries',{
                  headers: {
                    'Content-Type': 'application/json'
                  }
                })
                    .then(response => {
                        let data    =   response.data;
                        if (data.hasOwnProperty('data')) {
                            this.countries  =   data.data;
                            this.$store.commit('sessionStorage/setCountries',data.data);
                            if (this.$store.state.localStorage.city === '') {
                                this.$store.state.localStorage.city =   this.countries[0].city_id[0];
                            }
                        }
                    }).catch(error => {
                        console.log(error.response);
                    });
            } else {
                this.countries  =   this.$store.state.sessionStorage.countries;
                if (this.$store.state.localStorage.city === '') {
                    this.$store.state.localStorage.city   =   this.countries[0].city_id[0];
                }
            }
        }
    }
}
</script>

<style lang="scss">
.breadcrumb {
    background: transparent;
    padding: 0;
    margin: 0;
    color: #57a283;
    &-main {
        margin-top: 76px;
        padding: 15px !important;
    }
    & > li {
        display: flex;
        align-items: center;
        padding: 0;
        margin: 0 2px 0 2px;
        & > a {
            padding: 0;
            color: inherit;
            text-decoration: none !important;
        }
    }
    &-link {
        line-height: 1.2;
        font-size: 12px;
        font-weight: bold;
    }
    &-arrow, &-home {
        background: url('/img/logo/right-arrow.svg') no-repeat center;
        background-size: contain;
        width: 16px;
        height: 16px;
    }
    &-arrow {
        background-size: 50%;
    }
    &-home {
        background-image: url('/img/logo/home.svg');
    }
}
@media only screen and (max-width: 768px) {
    .breadcrumb {
        color: #fff;
        &-main {
            margin-top: 59px !important;
        }
        &-arrow, &-home {
            background-image: url('/img/logo/right-arrow-white.svg');
        }
        &-home {
            background-image: url('/img/logo/home-white.svg');
        }
    }
}
</style>
