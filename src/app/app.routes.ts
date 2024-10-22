import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { PostPageComponent } from './post-page/post-page.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "blog",
        component: BlogComponent
    },
    {
        path: "contact",
        component: ContactComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "blog/:pid",
        component: PostPageComponent
    },
    {
        path: "profile",
        component: ProfileComponent
    }
];
