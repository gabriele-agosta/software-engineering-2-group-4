TEMPLATE FOR RETROSPECTIVE (Team ##)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs. done
  > 3 committed, 2 done
- Total points committed vs. done
  > 6 points committed, 5 done
- Nr of hours planned vs. spent (as a team)
  > 48.05h planned, 60.8 spent

**Remember**a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!) 

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _Uncategorized_   |     12    |       |      33.55      |     38.1         |
| 1      |     4    |   3     |     5       |      5.5        |  
| 2 | 4 | 2 | 5.5 | 7 |
| 3 | 4 | 1 | 4 | 10 |

> story `Uncategorized` is for technical tasks, leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)

|            | Mean | StDev |
|------------|------|-------|
| Estimation |   2   |   2.373    | 
| Actual     |   2.5   |    3.16   |

- Total estimation error ratio: sum of total hours spent / sum of total hours effort - 1

    $$\frac{\sum_i spent_{task_i}}{\sum_i estimation_{task_i}} - 1$$
  > 0.265
    
- Absolute relative task estimation error: sum( abs( spent-task-i / estimation-task-i - 1))/n

    $$\frac{1}{n}\sum_i^n \left| \frac{spent_{task_i}}{estimation_task_i}-1 \right| $$
  > 0.5
  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated
    > 4.5
  - Total hours spent
    > 4.5
  - Nr of automated unit test cases
    > 15
  - Coverage
    > 60%
- E2E testing:
  - Total hours estimated
    > 0
  - Total hours spent
    > 0
  - Nr of test cases
    > 0
- Code review 
  - Total hours estimated
    > 3.5
  - Total hours spent
    > 3
  


## ASSESSMENT

- **What did go wrong in the sprint?**
  1. The process of building every element of the system togheter was too late
  2. lack of general dev patterns and rules that could've helped uniforming everything
  3. underestimating tasks. In particular, backend development
  4. didn't spend the appropriate time to the first tasks. In particular, the project structure.
  5. Lack of communication during development and lack of organization between team members
  6. the manage of the time was messy

- **What caused your errors in estimation (if any)?**
  1. lack of knowledge and experience on managing an agile project
  2. lack of organization

- **What lessons did you learn (both positive and negative) in this sprint?**
  1. The team should spend more time organizing and planning tasks before starting development.

  2. The team learned that “finished” doesn’t always mean the system actually works — there should always be time dedicated to reviewing and verifying what has been developed.

  3. Team communication is not always effective; members should also communicate directly with each other to solve smaller issues that don’t involve the whole team.

- **Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)**
  1. Timing and Organization: 
  The team should improve the number and clarity of deadlines and milestones. 
  Everyone should be aware of their available working days and hours so that tasks can be assigned more effectively. 
  The work (or even the team) should be divided in a way that minimizes dependencies between tasks — not just based on personal preferences. For example assign frontend to member x and y, backend to z and so on.
  1. Communication: 
  Setting up an effective communication channel that allows everyone to interact easily, share updates or issues related to the project, and collaborate efficiently (for example a Discord server).

- **One thing you are proud of as a Team!!**
  1. We consistently discuss and share opinions in a clear and professional way whenever issues arise during the project. There is also a strong positive attitude and a genuine willingness to improve.
