import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ButtonModule } from 'primeng/button';
import { TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ProfileComponent } from './profile/profile.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { DraftComponent } from './draft/draft.component';
import { TreeTableModule } from 'primeng/treetable';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SettingsComponent } from './settings/settings.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FocusTrapModule } from 'primeng/focustrap';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';
import { ProjectsComponent } from './projects/projects.component';
import { CoursesComponent } from './courses/courses.component';
import { FriendsComponent } from './friends/friends.component';
import { FilesComponent } from './files/files.component';
import { PlansComponent } from './plans/plans.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    SidebarComponent,
    DraftComponent,
    SettingsComponent,
    ProjectsComponent,
    CoursesComponent,
    FriendsComponent,
    FilesComponent,
    PlansComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    TabMenuModule,
    BadgeModule,
    SidebarModule,
    AvatarModule,
    AvatarGroupModule,
    CardModule,
    ImageModule,
    BrowserAnimationsModule,
    InputTextareaModule,
    FormsModule,
    ProgressBarModule,
    ToastModule,
    TreeTableModule,
    InputSwitchModule,
    FocusTrapModule,
    CheckboxModule,
    RadioButtonModule,
    TagModule,
    HttpClientModule,
    DialogModule,
    ConfirmDialogModule,
    FileUploadModule,
    TableModule,
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
