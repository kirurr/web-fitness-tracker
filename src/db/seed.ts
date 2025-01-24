import { createUserActivityLevelDTO } from "@/user-data/user-data-dto";
import { db } from "./db";
import { metActivityTable, userActivityLevelTable } from "./schema";
import { createMetActivityDTO } from "@/day/day-dto";

async function main() {
  const activities: createUserActivityLevelDTO[] = [
    {
      name: "Minimaly active",
      description:
        "This level is characterized by a lifestyle with minimal physical activity, typically involving a desk job and little to no exercise.",
      index: 1.2,
    },
    {
      name: "Lightly active",
      description:
        "Individuals at this level engage in light exercise, such as workouts lasting at least 20 minutes, 1 to 3 times a week.",
      index: 1.375,
    },
    {
      name: "Moderately active",
      description:
        "This category includes those who participate in moderate exercise, working out for 30 to 60 minutes, 3 to 4 times a week.",
      index: 1.55,
    },
    {
      name: "Very Active",
      description:
        "People in this group engage in vigorous exercise for 30 to 60 minutes, 5 to 7 times a week, or have physically demanding jobs.",
      index: 1.7,
    },
    {
      name: "Extremely active",
      description:
        "This level is for individuals who perform several intense workouts each day, 6 to 7 times a week, or have very labor-intensive jobs.",
      index: 1.9,
    },
  ];
  await db
    .insert(userActivityLevelTable)
    .values(activities)
    .onConflictDoNothing();

  const metActivities: createMetActivityDTO[] = [
    { name: "Sleeping", value: 0.95 },
    { name: "Meditating", value: 1.0 },
    { name: "Watching TV while sitting", value: 1.3 },
    { name: "Playing board games", value: 1.5 },
    { name: "Watering your lawn", value: 1.5 },
    { name: "Playing chess", value: 1.5 },
    { name: "Washing dishes", value: 1.8 },
    { name: "Ironing", value: 1.8 },
    { name: "Doing laundry", value: 2.0 },
    { name: "Ice fishing", value: 2.0 },
    { name: "Very slow walking", value: 2.0 },
    { name: "Nadisodhana yoga", value: 2.0 },
    { name: "Stretching", value: 2.3 },
    { name: "Dusting", value: 2.3 },
    { name: "Grocery shopping", value: 2.3 },
    { name: "Hatha yoga", value: 2.5 },
    { name: "Carrying out the trash", value: 2.5 },
    { name: "Camping", value: 2.5 },
    { name: "Standing", value: 2.5 },
    { name: "Snow blowing", value: 2.5 },
    { name: "Putting away groceries", value: 2.5 },
    { name: "Bow hunting", value: 2.5 },
    { name: "Watering plants", value: 2.5 },
    { name: "Slow pace walking", value: 2.8 },
    { name: "Slow dancing", value: 3.0 },
    { name: "Walking the dog", value: 3.0 },
    { name: "Hammering nails", value: 3.0 },
    { name: "Light yard work", value: 3.0 },
    { name: "Pilates", value: 3.0 },
    { name: "Diving", value: 3.0 },
    { name: "Washing windows", value: 3.2 },
    { name: "Sweeping", value: 3.3 },
    { name: "Walking downhill", value: 3.3 },
    { name: "Cooking dinner", value: 3.3 },
    { name: "Making your bed", value: 3.3 },
    { name: "Vacuuming", value: 3.3 },
    { name: "Squat using squat machine", value: 3.5 },
    { name: "Fishing", value: 3.5 },
    { name: "Mopping", value: 3.5 },
    { name: "Moderate speed walking", value: 3.5 },
    { name: "Bicycling 5.5 mph", value: 3.5 },
    { name: "Cleaning the garage", value: 3.5 },
    { name: "Giving the dog a bath", value: 3.5 },
    { name: "Using leaf blower", value: 3.5 },
    { name: "Walking moderate pace", value: 3.5 },
    { name: "Building a fence", value: 3.8 },
    { name: "Gymnastics", value: 3.8 },
    { name: "Raking leaves", value: 3.8 },
    { name: "Bowling", value: 3.8 },
    { name: "Trimming shrubs and trees", value: 4.0 },
    { name: "Paddleboat", value: 4.0 },
    { name: "Volleyball", value: 4.0 },
    { name: "Curling", value: 4.0 },
    { name: "Circuit training", value: 4.3 },
    { name: "Brisk speed walking", value: 4.3 },
    { name: "Slow pace stair climbing", value: 4.4 },
    { name: "Weeding your garden", value: 4.5 },
    { name: "Crab fishing", value: 4.5 },
    { name: "Chopping wood", value: 4.5 },
    { name: "Planting trees", value: 4.5 },
    { name: "Removing carpet", value: 4.5 },
    { name: "Rowing, stationary", value: 4.8 },
    { name: "Tap", value: 4.8 },
    { name: "Golf", value: 4.8 },
    { name: "Cricket", value: 4.8 },
    { name: "Skateboarding", value: 5.0 },
    { name: "Cleaning your gutters", value: 5.0 },
    { name: "Ballet", value: 5.0 },
    { name: "Elliptical trainer", value: 5.0 },
    { name: "Unicycling", value: 5.0 },
    { name: "Boot camp training", value: 5.0 },
    { name: "Low impact aerobics", value: 5.0 },
    { name: "Laying sod", value: 5.0 },
    { name: "Baseball", value: 5.0 },
    { name: "Softball", value: 5.0 },
    { name: "Moderate snow shoveling", value: 5.3 },
    { name: "Water aerobics", value: 5.3 },
    { name: "Ballroom dancing", value: 5.5 },
    { name: "Horseback riding", value: 5.5 },
    { name: "Step aerobics with 4” step", value: 5.5 },
    { name: "Mowing the lawn", value: 5.5 },
    { name: "Water aerobics", value: 5.5 },
    { name: "Squats with resistance band", value: 5.5 },
    { name: "Marching band", value: 5.5 },
    { name: "Swimming laps, moderate", value: 5.8 },
    { name: "Moderate rowing", value: 5.8 },
    { name: "Dodgeball", value: 5.8 },
    { name: "Bicycling 9.4 mph", value: 5.8 },
    { name: "Moving furniture", value: 5.8 },
    { name: "Bench pressing", value: 6.0 },
    { name: "Cheerleading", value: 6.0 },
    { name: "Leisurely swimming", value: 6.0 },
    { name: "Wrestling", value: 6.0 },
    { name: "Water skiing", value: 6.0 },
    { name: "Fencing", value: 6.0 },
    { name: "Deadlifts", value: 6.0 },
    { name: "Vigorous yard work", value: 6.0 },
    { name: "Shoveling snow", value: 6.0 },
    { name: "Jazzercise", value: 6.0 },
    { name: "Weight lifting", value: 6.0 },
    { name: "Jog/walk combo", value: 6.0 },
    { name: "Cross country hiking", value: 6.0 },
    { name: "Vigorously chopping wood", value: 6.3 },
    { name: "Climbing hills", value: 6.3 },
    { name: "Basketball", value: 6.5 },
    { name: "Zumba", value: 6.5 },
    { name: "Bicycling 10-11.9 mph", value: 6.8 },
    { name: "Ski machine", value: 6.8 },
    { name: "Slow cross country skiing", value: 6.8 },
    { name: "Stationary bicycle", value: 7.0 },
    { name: "Jet skiing", value: 7.0 },
    { name: "Roller skating", value: 7.0 },
    { name: "Jogging", value: 7.0 },
    { name: "Kickball", value: 7.0 },
    { name: "Backpacking", value: 7.0 },
    { name: "Racquetball", value: 7.0 },
    { name: "Ice skating", value: 7.0 },
    { name: "Soccer", value: 7.0 },
    { name: "Skiing", value: 7.0 },
    { name: "Sledding", value: 7.0 },
    { name: "High impact aerobics", value: 7.3 },
    { name: "Tennis", value: 7.3 },
    { name: "Step aerobics with 6”-8” step", value: 7.5 },
    { name: "Vigorous snow shoveling", value: 7.5 },
    { name: "Carrying groceries upstairs", value: 7.5 },
    { name: "Line dancing", value: 7.8 },
    { name: "Field hockey", value: 7.8 },
    { name: "Lacrosse", value: 8.0 },
    { name: "Synchronized swimming", value: 8.0 },
    { name: "Rock climbing", value: 8.0 },
    { name: "Flag football", value: 8.0 },
    { name: "Jogging in place", value: 8.0 },
    { name: "Bicycling 12-13.9 mph", value: 8.0 },
    { name: "Ice hockey", value: 8.0 },
    { name: "Jump squats", value: 8.0 },
    { name: "Running a 12 min/mile", value: 8.3 },
    { name: "Rugby", value: 8.3 },
    { name: "BMX", value: 8.5 },
    { name: "Spin class", value: 8.5 },
    { name: "Mountain biking", value: 8.5 },
    { name: "Vigorous stationary rowing", value: 8.5 },
    { name: "Fast pace stair climbing", value: 8.8 },
    { name: "Slow pace rope jumping", value: 8.8 },
    { name: "Cross country running", value: 9.0 },
    { name: "Basketball drills", value: 9.3 },
    { name: "Step aerobics with 10”-12” step", value: 9.5 },
    { name: "Kettlebell swings", value: 9.8 },
    { name: "Swimming laps vigorously", value: 9.8 },
    { name: "Running 10 min/mile", value: 9.8 },
    { name: "Treading water, fast", value: 9.8 },
    { name: "Rollerblading moderate pace", value: 9.8 },
    { name: "Water polo", value: 10.0 },
    { name: "Bicycling 14-15.9 mph", value: 10.0 },
    { name: "Aerobics while wearing 10-15 lb weights", value: 10.0 },
    { name: "Kickboxing", value: 10.3 },
    { name: "Tae kwan do", value: 10.3 },
    { name: "Running 9 min/mile", value: 10.5 },
    { name: "Skipping rope", value: 11.0 },
    { name: "Slide board exercises", value: 11.0 },
    { name: "Running 8 min/mile", value: 11.8 },
    { name: "Moderate pace rope jumping", value: 11.8 },
    { name: "Bicycling 16-19 mph", value: 12.0 },
    { name: "Very vigorous stationary rowing", value: 12.0 },
    { name: "Fast rope jumping", value: 12.3 },
    { name: "Running 7 min/mile", value: 12.3 },
    { name: "Fast pace rollerblading", value: 12.3 },
    { name: "Vigorous kayaking", value: 12.5 },
    { name: "Brisk cross country skiing", value: 12.5 },
    { name: "Boxing", value: 12.8 },
    { name: "Marathon running", value: 13.3 },
    { name: "Speed skating", value: 13.3 },
    { name: "Ice dancing", value: 14.0 },
    { name: "Running 6 min/mile", value: 14.5 },
    { name: "Running stairs", value: 15.0 },
    { name: "Bicycling > 20 mph", value: 15.8 },
    { name: "Running 5 min/mile", value: 19.0 },
  ];
  await db.insert(metActivityTable).values(metActivities).onConflictDoNothing();
}
main();
