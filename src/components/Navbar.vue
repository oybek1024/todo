<template>
    <nav>
        <v-toolbar app dark>
            <v-btn icon @click="draw = !draw">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
            <v-toolbar-title>
                <span class="text-uppercase grey--text font-weight-light">todo</span>
                <span class="text-uppercase white--text">ghost</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            

            <v-btn icon>
                <v-icon>mdi-bell</v-icon>
            </v-btn>

            <v-btn text>
                Sign Out<v-icon>mdi-exit-to-app</v-icon>
            </v-btn>
        </v-toolbar>

    <v-navigation-drawer v-model="draw" app>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="title">
                    Johnny Depp<v-btn class="float-right" text @click="draw = !draw"><v-icon>mdi-close-thick</v-icon></v-btn>
                </v-list-item-title>
                <v-list-item-subtitle>
                    Web Developer
                </v-list-item-subtitle>
                
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
            dense
            nav
        >
            <v-list-item v-for="item in items"
            :key="item.title"
            link
            router
            :to="item.route"
            >
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
    </nav>
</template>

<script>
export default{
    data(){
        return{
            draw: false,
            items: [
                { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/' },
                { title: 'Persons', icon: 'mdi-account', route: '/persons' },
                { title: 'Tasks', icon: 'mdi-table-large', route: '/tasks' },
            ],
        }
    }
}
</script>