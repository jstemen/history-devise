# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


App.create(title: 'facebook', url: 'https://fbstatic-a.akamaihd.net/rsrc.php/v2/yJ/r/XZU5QNqW7-3.js')

App.create(title: 'twitter', url: 'https://abs.twimg.com/a/1421172151/css/t1/twitter_core.bundle.css')
App.create(title: 'slickdeals', url: 'http://css.slickdealscdn.com/min/3729/g=css&style=14&n=tutorial')


User.create(first_name: 'Jared', last_name: 'Stemen', email: 'jstemen@gmail.com',password: 'abcdefgh', password_confirmation: 'abcdefgh')
