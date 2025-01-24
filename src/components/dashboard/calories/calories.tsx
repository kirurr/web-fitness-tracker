export default function Calories({
  caloriesForDay,
  caloriesBurnt,
  caloriesIntake,
}: {
  caloriesForDay: number;
  caloriesBurnt: number;
  caloriesIntake: number;
}) {
  return (
    <div>
      <h1>Calories</h1>
      <p>Calories for day: {caloriesForDay}</p>
      <p>Calories burned: {caloriesBurnt}</p>
      <p>Calories intake: {caloriesIntake}</p>
    </div>
  );
}
