/**
 * This is a temporary test page to verify your work.
 *
 * This tests out lessons 1, 2, and 23 (but obviously should work with any lesson).
 * You shouldn't need to edit this file. If there are errors, make sure your file and
 * function names match up correctly.
 *
 *
 * When you've finished the helper functions, uncomment this file (highlight all, then cmd + /).
 * Then, visit http://localhost:3000/app/test-lesson-storage to see your calculations in browser.
 *
 * Compare those results with the images in the github issue.
 *
 * IMPORTANT!!: once you're sure your PR works, delete this page.
 *  */

// import { getLessonSizeBytes } from "@/lib/getLessonSizeBytes";
// import { formatBytes } from "@/lib/formatBytes";

// export default async function Page() {
//   const lessonIds = [1, 2, 23];

//   const results = await Promise.all(
//     lessonIds.map(async (lessonId) => {
//       const bytes = await getLessonSizeBytes(lessonId);
//       return {
//         lessonId,
//         bytes,
//         formatted: formatBytes(bytes),
//       };
//     })
//   );

//   return (
//     <div>
//       <h1>Lesson Size Test</h1>

//       {results.map((r) => (
//         <div key={r.lessonId}>
//           <h2>Lesson {r.lessonId}</h2>
//           <p>Raw Bytes: {r.bytes}</p>
//           <p>Formatted: {r.formatted}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
