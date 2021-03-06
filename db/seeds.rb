# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# Cat.destroy_all
# 5.times do
#   name = Faker::Creature::Cat.name
#   breed = Faker::Creature::Cat.breed
#   registry = Faker::Creature::Cat.registry
#   avatar = Faker::Avatar.image(slug: name, size: "100x400", format: "png", set: "set4")
#   Cat.create(name: name, breed: breed, registry: registry, avatar: avatar)
# end

2.times do |i|
  user = User.create(email: "test#{i}@t.com", password: "12345678")

  5.times do |j|
    user.posts.create(title: "post-#{j}")
  end

  user.problems.create(question: "what is 1+ 1", answer: 2)
  user.problems.create(question: "what is 3 + 1", answer: 4)
  user.problems.create(question: "what is 2 + 1", answer: 3)
end
