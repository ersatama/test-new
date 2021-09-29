<template>
<!--    <comment :item="item" ></comment>-->
    <div class="sidebar" :class="{'sidebar-view':this.storage.sidebar.show}">
        <div class="sidebar-header">
            <div class="sidebar-close" @click="this.storage.sidebar.show =   false"></div>
            <button class="sidebar-title">Уведомления</button>
        </div>
        <div class="sidebar-notifications" v-if="notifications.length > 0">
            <div class="sidebar-notification-main" v-for="(notification,key) in notifications" :key="key">
                <div class="sidebar-notification">
                    <div class="sidebar-notification-icon"></div>
                    <div class="sidebar-notification-detail" v-if="notification.organization">
                        <div class="sidebar-notification-detail-title text-white">
                            <a :href="'/home/'+notification.organization.id" class="p-0 text-white font-weight-bold">{{notification.organization.title}}</a> • <span v-if="notification.organization_tables">{{notification.organization_tables.title}}</span>
                        </div>
                        <div class="sidebar-notification-detail-description text-white">{{notification.date}} • {{notification.time}}</div>
                    </div>
                </div>
                <a class="sidebar-notification-link p-0" @click="comment(key)" data-toggle="modal" data-target="#comment_modal"><button class="sidebar-notification-comment sidebar-notification-link" >Оставить комментарии</button></a>
            </div>
        </div>
        <div class="sidebar-empty" v-else></div>
    </div>
</template>

<script>
export default {
    props: ['view'],
    name: "Sidebar",
    data() {
        return {
            notifications: [],
            item: {},
            user: false,
            status: true,
        }
    },
    created() {
        this.getUser();
    },
    mounted() {

    },
    methods: {
        getUser: function() {
            if (this.storage.token && sessionStorage.user) {
                this.user   =   JSON.parse(sessionStorage.user);
            }
        },
    }
}
</script>

<style lang="scss">
    .sidebar {
        background: #00a082;
        box-shadow: 1px 2px 10px rgba(0,0,0,.3);
        position: fixed;
        overflow: auto;
        width: 400px;
        height: 100%;
        right: -120%;
        top: 0;
        bottom: 0;
        z-index: 1000;
        transition: all 0.3s ease;
        &-notifications {
            margin: 20px;
        }
        &-notification {
            display: flex;
            gap: 10px;
            flex-basis: auto;
            align-items: center;
            &-link {
                width: 100%;
            }
            &-main {
                margin-top: 15px;
                background: #008264;
                border-radius: 15px;
                padding: 15px;
            }
            &-icon {
                width: 60px;
                height: 60px;
                background: url('/img/logo/calendar.svg') no-repeat center;
                background-size: contain;
            }
            &-detail {
                &-title {
                    font-size: 16px;
                }
                &-description {
                    font-size: 14px;
                }
            }
            &-comment {
                margin-top: 15px;
                height: 44px;
                border-radius: 10px;
                background: #FF8008;
                border: none;
                color: #fff;
                font-weight: bold;
                font-size: 14px;
            }
        }
        &-notification {
            &-main:first-child {
                margin: 0;
            }
        }
        &-view {
            right: 0;
        }
        &-empty {
            background: url(/img/logo/bell-green.svg) no-repeat center;
            background-size: contain;
            position: absolute;
            width: 100px;
            height: 100px;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
        &-header {
            margin: 20px;
            display: grid;
            grid-template-columns: 40px auto;
            gap: 15px;
        }
        &-close {
            width: 40px;
            height: 40px;
            background: #008264 no-repeat center url('/img/logo/right-arrow-white.svg');
            background-size: 30%;
            border-radius: 50px;
            cursor: pointer;
        }
        &-title {
            background: #008264;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
            border-radius: 20px;
            text-align: center;
            height: 40px;
            border: none;
        }
    }
    @media only screen and (max-width: 768px) {
        .sidebar {
            z-index: 10000;
            width: 100%;
            &-header {
                margin: 10px;
                gap: 10px;
            }
            &-title {
                font-size: 12px;
            }
            &-notifications {
                margin: 10px;
            }
            &-notification {
                gap: 5px;
                &-icon {
                    width: 35px;
                    height: 35px;
                }
                &-detail {
                    &-title {
                        font-size: 11px;
                    }
                    &-description {
                        font-size: 10px;
                    }
                }
                &-link {
                    width: auto;
                }
                &-main {
                    margin-top: 5px;
                    padding: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                &-comment {
                    font-size: 10px;
                    margin-top: 0;
                    height: 30px;
                }
            }
        }
    }
</style>
