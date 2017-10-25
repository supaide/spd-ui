<template>
<div>
  <header v-show="!blank" class="navbar navbar-dark navbar-expand spd-header">
    <a class="navbar-brand mr-0 mr-md-2" href="/" aria-label="Bootstrap">
      <svg class="d-block" width="36" height="36" viewBox="0 0 612 612" xmlns="http://www.w3.org/2000/svg" focusable="false"><title>Bootstrap</title><path fill="currentColor" d="M510 8a94.3 94.3 0 0 1 94 94v408a94.3 94.3 0 0 1-94 94H102a94.3 94.3 0 0 1-94-94V102a94.3 94.3 0 0 1 94-94h408m0-8H102C45.9 0 0 45.9 0 102v408c0 56.1 45.9 102 102 102h408c56.1 0 102-45.9 102-102V102C612 45.9 566.1 0 510 0z"></path><path fill="currentColor" d="M196.77 471.5V154.43h124.15c54.27 0 91 31.64 91 79.1 0
      33-24.17 63.72-54.71 69.21v1.76c43.07 5.49 70.75 35.82 70.75 78 0 55.81-40 89-107.45 89zm39.55-180.4h63.28c46.8 0 72.29-18.68 72.29-53 0-31.42-21.53-48.78-60-48.78h-75.57zm78.22 145.46c47.68 0 72.73-19.34 72.73-56s-25.93-55.37-76.46-55.37h-74.49v111.4z"></path></svg>
    </a>
    <div class="navbar-nav-scroll">
      <ul class="navbar-nav flex-row">
        <li class="nav-item">
          <a class="nav-link " href="/" >速派得CMS</a>
        </li>
      </ul>
    </div>

    <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
      <li class="nav-item dropdown">
        <a class="nav-item nav-link dropdown-toggle mr-md-2" href="javascript:void(0);" id="spd-header-account" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          您好! {{name}}
        </a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="spd-header-account">
          <a class="dropdown-item" href="javascript:void(0);" @click="$emit('on-click', 'account')">我的帐户</a>
          <a class="dropdown-item" href="javascript:void(0);" @click="$emit('on-click', 'logout')">退出</a>
        </div>
      </li>
    </ul>
  </header>
  <div class="container-fluid">
    <div class="row flex-xl-nowrap">
      <div class="col-12 col-md-2 spd-sidebar" v-show="!blank">
        <form class="spd-sidebar-search d-flex align-items-center">
          <input type="search" class="form-control form-control-sm" placeholder="查：ID / 手机号" autocomplete="off" spellcheck="false" dir="auto" style="position: relative; vertical-align: top;">
          <button class="btn-link spd-nav-toggle d-md-none p-0 ml-3" type="button" data-toggle="collapse" data-target="#spd-nav">
            <svg class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30" focusable="false"><title>Menu</title><path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" d="M4 7h22M4 15h22M4 23h22"></path></svg>

          </button>
        </form>

        <nav class="spd-sidebar-links collapse" id="spd-nav">
          
          <div class="spd-sidebar-menu" v-for="(item, index) in menus" :key="item.title" @click.stop.prevent="menuToggle(index)">
            <a class="spd-sidebar-menu-title" href="javascript:void(0);">
              {{item.title}}
            </a>

            <ul class="nav spd-sidebar-items">
              <li v-for="(subItem, index2) in item.subs" :key="subItem.url">
                <a href="javascript:void(0);" @click.stop.prevent="$emit('on-click', 'menu', subItem.url)">
                  {{subItem.title}}
                </a>
              </li>
            </ul>
          </div>

        </nav>
      </div>
      <main class="col-12 py-sm-3 pl-md-3 spd-content" :class="[blank ? 'col-sm-12' : 'col-md-10']">
        <nav class="spd-breadcrumb breadcrumb" v-if="breadCrumbs && breadCrumbs.length > 0">
          <v-link class="breadcrumb-item" :href="item.url" v-for="(item, index) in breadCrumbs" :key="index" v-if="index<breadCrumbs.length-1">{{item.title}}</v-link>
          <span class="breadcrumb-item active">{{breadCrumbs[breadCrumbs.length-1].title}}</span>
        </nav>
        <slot></slot>
      </main>
    </div>
  </div>
</div>
</template>
<script>
import {$} from 'spd-webutil'
import VLink from '../v-link/index.vue'
export default {
  components: {
    VLink
  },
  props: {
    blank: {
      type: Boolean,
      default: true
    },
    img: String,
    name: String,
    breadCrumbs: Array,
    menus: Array
  },
  created () {
    window.admin = this
  },
  methods: {
    menuToggle(index) {
      let menus = document.querySelectorAll('#spd-nav .spd-sidebar-menu')
      menus.forEach((menu, ind) => {
        if (ind == index) {
          menu.classList.add('active')
          let height = 0
          let items = menu.querySelectorAll('li')
          items.forEach((item) => {
            height += parseFloat(window.getComputedStyle(item).height)
          })
          menu.querySelector('ul').style.height = height + 'px'
        } else {
          menu.classList.remove('active')
          menu.querySelector('ul').style.height = 0
        }
      })
    },
  },
  watch: {
  }
}
</script>
<style lang="less">
//@import '../../style/spd/widget/spd-admin/spd-admin.less';
@media (min-width: 768px) {
.spd-header {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1071;
}
}

.spd-header {
  font-size: 1.15rem;
  min-height: 4rem;
  background-color: #563d7c;
  box-shadow: 0 0.5rem 1rem rgba(0,0,0,.05), inset 0 -1px 0 rgba(0,0,0,.1);

  .navbar-nav {
    .nav-link {
      padding-right: .5rem;
      padding-left: .5rem;
      color: #cdbfe3;

      &.active,
      &:hover {
        color: #fff;
        background-color: transparent;
      }

      &.active {
        font-weight: 500;
      }
    }
  }

  .dropdown-menu {
    font-size: .875rem;
  }
}


@media (min-width: 1200px) {
  .spd-sidebar {
    max-width: 320px;
  }
}
@media (min-width: 768px) {
  .spd-sidebar {
    position: -webkit-sticky;
    position: sticky;
    top: 4rem;
    z-index: 1000;
    max-height: calc(100vh - 4rem);
  }
}
@media (min-width: 768px) {
  .spd-sidebar {
    border-right: 1px solid rgba(0,0,0,.1);
  }
}
.spd-sidebar {
  -ms-flex-order: 0;
  order: 0;
  border-bottom: 1px solid rgba(0,0,0,.1);
}
.spd-sidebar-search {
  position: relative;
  padding: .5rem 15px;
  margin-right: -15px;
  margin-left: -15px;
  border-bottom: 1px solid rgba(0,0,0,.05);
}

@media (min-width: 768px) {
  .spd-sidebar-links {
    display: block!important;
  }
}
@media (min-width: 768px) {
  .spd-sidebar-links {
    max-height: calc(100vh - 9rem);
    overflow-y: auto;
  }
}
.spd-sidebar-links {
  //padding-top: 1rem;
  padding-bottom: 1rem;
  margin-right: -15px;
  margin-left: -15px;
}
.spd-sidebar-menu-title {
  display: block;
  padding: .5rem 1.5rem;
  font-weight: 500;
  color: rgba(0,0,0,.65);
}
.spd-sidebar-items {
  display: block;
  transition: height .3s ease-in-out;
  height: 0;
  overflow: hidden;
}
.spd-sidebar .nav>li>a:hover {
  color: rgba(0,0,0,.85);
  text-decoration: none;
  background-color: transparent;
}
.spd-sidebar .nav>li>a {
  display: block;
  padding: .25rem 1rem .25rem 2.5rem;
  font-size: 90%;
  color: rgba(0,0,0,.65);
}
.spd-sidebar-menu.active:not(:first-child) {
  //margin-top: 1rem;
}
.spd-sidebar-menu.active {
  //margin-bottom: .5rem;
}
.spd-sidebar-menu.active>.spd-sidebar-menu-title {
  color: rgba(0,0,0,.85);
}
//.spd-sidebar-menu.active>.spd-sidebar-items {
//  display: block;
//}
.spd-content {
  order: 1;
}
.spd-sidebar-menu:last-child {
  padding-bottom: 30px;
}
.spd-nav-toggle {
  line-height: 1;
  color: #212529;
}
</style>
