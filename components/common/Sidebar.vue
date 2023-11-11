<template>
   <main>
      <nav
         id="sidebar"
         class="position-fixed d-print-none"
         :class="sidebar_class"
      >
         <button
            type="button"
            class="btn btn-sm btn-secondary collapse-btn"
            @click="toggleSidebar"
         >
            <i class="fas fa-bars"></i>
         </button>
         <ul class="list-unstyled components">
            <li>
               <RouterLink to="/" @click="toggleSidebar" exact>
                  <i class="fas fa-home mr-1"></i>
                  {{ $t("Home") }}
               </RouterLink>
            </li>

            <li>
               <RouterLink @click="toggleSidebar" to="/memberships" exact>
                  <i class="fas fa-users mr-1"></i>
                  {{ $t("My memberships") }}
               </RouterLink>
            </li>

            <li>
               <RouterLink to="/packages" @click="toggleSidebar" exact>
                  <i class="fas fa-users mr-1"></i>
                  {{ $t("Packages") }}
               </RouterLink>
            </li>
         </ul>
      </nav>
   </main>
</template>

<script>
export default {
   data() {
      return {
         sidebar_class: "active",
      };
   },
   methods: {
      toggleSidebar() {
         if (this.sidebar_class == "") {
            this.sidebar_class = "active";
         } else {
            this.sidebar_class = "";
         }
      },
   },
};
</script>

<style scoped>
.collapse-btn {
   position: absolute;
   /* top: 10px; */
   right: -30px;
   border-radius: 0 0.5rem 0.5rem 0;
   background: var(--color-2);
   border-color: var(--color-2);
}
.collapse-btn:focus {
   box-shadow: none;
}
div[dir="rtl"] .collapse-btn {
   left: -30px;
   right: auto;
   border-radius: 0.5rem 0 0 0.5rem;
}
#sidebar {
   min-width: 250px;
   max-width: 250px;
   min-height: calc(100vh - 57px);
   margin-top: 57px;
}

#sidebar.active {
   margin-left: -250px;
}

div[dir="rtl"] #sidebar.active {
   margin-right: -250px;
   margin-left: 0;
}

@media (max-width: 768px) {
   #sidebar {
      margin-left: -250px;
   }
   #sidebar.active {
      margin-left: 0;
   }
   /* div[dir='rtl'] #sidebar {
        margin-right: -250px;
        margin-left: auto !important;
    }
    div[dir='rtl'] #sidebar.active {
        margin-right: 0;
    } */
}
a,
a:hover,
a:focus {
   color: inherit;
   text-decoration: none;
   transition: all 0.3s;
}

#sidebar {
   background: var(--color-2);
   color: #fff;
   transition: all 0.3s;
   z-index: 1;
}

#sidebar .sidebar-header {
   padding: 20px;
   background: #6d7fcc;
}

/* #sidebar ul.components {
    padding: 20px 0;
} */

#sidebar ul p {
   color: #fff;
   padding: 10px;
}

#sidebar ul li a {
   padding: 15px;
   display: block;
}
#sidebar ul li a:hover {
   background: var(--color-2-l1);
}

#sidebar ul li.active > a {
   color: #fff;
   background: var(--color-1);
}
ul ul a {
   font-size: 0.9em !important;
   padding-left: 30px !important;
   background: #6d7fcc;
}
.list-unstyled {
   padding-inline-start: 0;
}
</style>
