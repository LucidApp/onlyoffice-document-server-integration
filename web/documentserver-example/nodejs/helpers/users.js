/**
 *
 * (c) Copyright Ascensio System SIA 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var descr_user_1 = [
    "File author by default",
    "Doesn’t belong to any group",
    "Can review all the changes",
    "Can perform all actions with comments",
    "The file favorite state is undefined",
    "Can create files from templates using data from the editor",
    "Can see the information about all users",
    //"Can submit forms"
];

var descr_user_2 = [
    "Belongs to Group2",
    "Can review only his own changes or changes made by users with no group",
    "Can view comments, edit his own comments and comments left by users with no group. Can remove his own comments only",
    "This file is marked as favorite",
    "Can create new files from the editor",
    "Can see the information about users from Group2 and users who don’t belong to any group",
    //"Can’t submit forms"
];

var descr_user_3 = [
    "Belongs to Group3",
    "Can review changes made by Group2 users",
    "Can view comments left by Group2 and Group3 users. Can edit comments left by the Group2 users",
    "This file isn’t marked as favorite",
    "Can’t copy data from the file to clipboard",
    "Can’t download the file",
    "Can’t print the file",
    "Can create new files from the editor",
    "Can see the information about Group2 users",
    //"Can’t submit forms"
];

var descr_user_0 = [
    "The name is requested when the editor is opened",
    "Doesn’t belong to any group",
    "Can review all the changes",
    "Can perform all actions with comments",
    "The file favorite state is undefined",
    "Can't mention others in comments",
    "Can't create new files from the editor",
    "Can’t see anyone’s information",
    "Can't rename files from the editor",
    "Can't view chat",
    //"Can’t submit forms"
];

var users = [
    new User("uid-1", "John Smith", "smith@example.com",
            null, null, {}, null,
            null, [], descr_user_1, true),
    new User("uid-2", "Mark Pottato", "pottato@example.com",
            "group-2", ["group-2", ""], {
                view: "",
                edit: ["group-2", ""],
                remove: ["group-2"]
            }, ["group-2", ""],
            true, [], descr_user_2, false),  // own and without group
    new User("uid-3", "Hamish Mitchell", "mitchell@example.com",
            "group-3", ["group-2"], {
                view: ["group-3", "group-2"],
                edit: ["group-2"],
                remove: []
            }, ["group-2"],
            false, ["copy", "download", "print"], descr_user_3, false),  // other group only
    new User("uid-0", null, null,
            null, null, {}, [],
            null, [], descr_user_0, false),
];

function User(id, name, email, group, reviewGroups, commentGroups, userInfoGroups, favorite, deniedPermissions, descriptions, templates) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.group = group;
    this.reviewGroups = reviewGroups;
    this.commentGroups = commentGroups;
    this.userInfoGroups = userInfoGroups;
    this.favorite = favorite;
    this.deniedPermissions = deniedPermissions;
    this.descriptions = descriptions;
    this.templates = templates;
};

// get a list of all the users
users.getAllUsers = function () {
    return users;
};

// get a user by id specified
users.getUser = function (id) {
    var result = null;
    this.forEach(user => {
        if (user.id == id) {
            result = user;
        }
    });
    return result ? result : this[0];
};

// get a list of users with their names and emails for mentions
users.getUsersForMentions = function (id) {
    var result = [];
    this.forEach(user => {
        if (user.id != id && user.name != null && user.email != null) {
            result.push({ name: user.name, email: user.email });
        }
    });
    return result;
};

module.exports = users;
