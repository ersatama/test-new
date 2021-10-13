<template>
    <div>
      <loading v-if="organizations.length === 0"></loading>
      <div class="container-fluid py-3 py-md-4 item-bg" v-else-if="category">
        <div class="container">
          <div class="row">
            <div class="result">
              <div class="result-body">
                <div class="result-body-header">
                  <div class="result-body-header-count" v-if="found >= 0">Найдено заведении <span>{{found}}</span></div>
                  <div class="result-body-header-sort">
                    <div class="result-body-header-sort-title">Сортировка:</div>
                    <div class="result-body-header-sort-dropdown">
                      <div class="result-body-header-sort-dropdown-title" @click="$store.commit('organization/selected',{
                        index: selected.index,
                        show: !selected.show
                      })">{{ sort[selected.index].title }}</div>
                      <div class="result-body-header-sort-dropdown-list" :class="{'result-body-header-sort-dropdown-list-open':selected.show}">
                        <div class="result-body-header-sort-dropdown-list-item" v-for="(item,key) in sort" :key="key" @click="sel(key)">{{item.title}}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="result-body-main">
                  <Card :organization="organization" v-for="(organization,key) in organizations" :key="key"></Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <not-found v-else :params="NotFound" ></not-found>
    </div>
</template>

<script>
import Loading from '../../components/layout/Loading';
import NotFound from '../../components/layout/Not-found';
import Card from '../../components/layout/Card';
export default {
    props: ['category'],
    name: "Organization",
    components: {
        Loading,
        NotFound,
        Card
    },
    data() {
        return  {
            NotFound: {
                img: '/img/logo/reserved.png',
                title: 'Не найдено',
                description: 'Возможно категория которую вы искали называется иначе.'
            },
            filters: {
                price: {
                    status: false,
                    min: 0,
                    max: 0,
                },
                ratings: {
                    status: false,
                    min: 0,
                    max: 0,
                },
                tags: [],
            },
            Loading: true,
        }
    },
    created() {
        if (process.browser) {
          this.selectedValue();
        }
    },
    computed: {
      found() {
        return this.$store.state.organization.found;
      },
      organizations() {
        return this.$store.state.organization.organizations;
      },
      sort() {
        return this.$store.state.organization.sort;
      },
      selected() {
        return this.$store.state.organization.selected;
      }
    },
    mounted() {
        if (process.browser) {
          this.scrollEvent();
        }
    },
    methods: {
        sel: function(key) {
            this.$store.commit('organization/selected',{
              index: key,
              show: false
            });
            this.selectedValue();
        },
        scrollEvent: function() {
            let self    =   this;
            window.document.body.onscroll = function() {
                let height = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight;
                if ((document.documentElement.offsetHeight - height) < 1000) {
                    self.getOrganizationsByCategoryId();
                }
            }
        },
        selectedValue: function() {
            this.$store.commit('organization/init');
            this.getCountOrganizationsByCategoryId();
            this.getOrganizationsByCategoryId();
        },
        filterUpdate: function(data) {
          this.filters =   data;
          this.$store.commit('organization/init');
          this.getCountOrganizationsByCategoryId();
          this.getOrganizationsByCategoryId();
        },
        getCountOrganizationsByCategoryId: function() {
          this.$store.dispatch('organization/getCountOrganizationsByCategoryId',{
            city: this.$store.state.localStorage.city.id,
            page: this.$store.state.organization.page,
            filters: this.filters
          })
        },
        getOrganizationsByCategoryId: function() {
          this.filters.sort    =   this.selected.index;
          this.$store.dispatch('organization/getOrganizationsByCategoryId', {
            city: this.$store.state.localStorage.city.id,
            page: this.$store.state.organization.page,
            filters: this.filters
          });
        },
    }
}
</script>

<style lang="scss">
@import '../../assets/layout/organization.scss';
</style>
