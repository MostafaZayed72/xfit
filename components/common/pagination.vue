<template>
    <div class="text-right m-2">
        <!-- Next -->
        <button
            class="btn btn-primary"
            :disabled="next_disabled"
            @click="nextPageClicked"
        >
            <i
                class="fas"
                :class="lang == 'ar' ? 'fa-arrow-right' : 'fas fa-arrow-left'"
            ></i>
        </button>

        <span>
            <div class="dropdown">
                <button
                    class="btn btn-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <span> {{ $t('Page') }}</span>
                    <span>
                        {{ pagination.current_page }}
                    </span>
                    <span> {{ $t('of') }}</span>
                    <span>
                        {{ pagination.pages_count }}
                    </span>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a
                        v-for="page in pagination.pages_count"
                        :key="page"
                        class="dropdown-item"
                        href="javascript:;"
                        @click="goToPage(page)"
                    >
                        {{ page }}
                    </a>
                </div>
            </div>
        </span>

        <!-- Previous -->
        <button
            class="btn btn-primary"
            :disabled="previous_disabled"
            @click="previousPageClicked"
        >
            <i
                class="fas"
                :class="lang == 'ar' ? 'fa-arrow-left' : 'fas fa-arrow-right'"
            ></i>
        </button>
    </div>
</template>

<script>
export default {
    computed: {
        lang: function () {
            return this.$store.state.lang
        },
        pagination: function () {
            return this.$store.state.pagination
        },
        previous_disabled: function () {
            if (this.pagination.current_page <= 1) return true
        },
        next_disabled: function () {
            if (this.pagination.current_page >= this.pagination.pages_count)
                return true
        },
    },
    methods: {
        changePaginationPerPage(per_page) {
            this.$store.dispatch('updatePagination', {
                state_name: 'per_page',
                state_value: per_page,
            })
        },
        previousPageClicked() {
            if (this.pagination.current_page > 1)
                this.$store.dispatch('updatePagination', {
                    state_name: 'current_page',
                    state_value: Number(this.pagination.current_page) - 1,
                })
        },
        nextPageClicked() {
            this.$store.dispatch('updatePagination', {
                state_name: 'current_page',
                state_value: Number(this.pagination.current_page) + 1,
            })
        },
        goToPage(page_number) {
            this.$store.dispatch('updatePagination', {
                state_name: 'current_page',
                state_value: page_number,
            })
        },
    },
}
</script>
<style scoped>
.dropdown {
    display: inherit;
    margin: 0 5px;
    font-size: 14px;
}
div[dir='rtl'] .dropdown-toggle::after {
    margin-right: 1em;
    margin-left: 0;
}
.dropdown-toggle::after {
    margin-right: 0;
    margin-left: 1em;
}
.dropdown-menu {
    min-width: 1.5rem;
    max-height: 300px;
    overflow: auto;
}
.dropdown-menu .dropdown-item,
.dropdown-menu li > a {
    min-width: 1.5rem;
    margin: 0;
}
@media (max-width: 380px) {
    * {
        font-size: 0.6rem !important;
    }
}
</style>
