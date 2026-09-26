"use client";

import { CenteredProductStory } from "@/components/features/story/CenteredProductStory";
import { ScrollProductStory } from "@/components/features/story/ScrollProductStory";
import {
  ACCESS_STAGES,
  CLIENT_STAGES,
  FILE_STAGES,
  LEAD_STAGES,
  PROPOSAL_STAGES,
  REPORT_STAGES,
  SEARCH_STAGES,
  TAG_STAGES,
  TIME_STAGES,
  TRASH_STAGES,
} from "@/components/features/modules/catalog";
import { BoardStory } from "@/components/features/board-story/BoardStory";
import { CalendarTimeStory } from "@/components/features/calendar-story/CalendarTimeStory";
import { ProjectBuildStory } from "@/components/features/project-build/ProjectBuildStory";
import { GanttStory } from "@/components/features/gantt-story/GanttStory";
import {
  ClientsCanvas,
  LeadsCanvas,
  ProposalsCanvas,
  TimeFinanceCanvas,
} from "@/components/features/modules/CrmCanvases";
import {
  AccessCanvas,
  FilesCanvas,
  ReportsCanvas,
  SearchCanvas,
  TagsCanvas,
  TrashCanvas,
} from "@/components/features/modules/OpsCanvases";

export function ModuleStories() {
  return (
    <>
      <ProjectBuildStory />

      <BoardStory />

      <CalendarTimeStory />

      <GanttStory />

      <ScrollProductStory
        id="time-budget"
        eyebrow="Time and finance"
        heading="Work becomes"
        accent="measurable."
        lead="Log hours on a project or task. Invoices and approved expenses live in Finance and feed the project budget tier. Timesheets do not create invoices."
        stages={TIME_STAGES}
        renderCanvas={(progress, reducedMotion) => (
          <TimeFinanceCanvas progress={progress} reducedMotion={reducedMotion} />
        )}
      />

      <CenteredProductStory
        id="clients"
        eyebrow="Clients"
        heading="A client stays"
        accent="connected to the work."
        lead="Client records link to projects, tasks, and proposals. The detail page is the place those relationships come together."
        stages={CLIENT_STAGES}
        renderCanvas={(progress, reducedMotion) => (
          <ClientsCanvas progress={progress} reducedMotion={reducedMotion} />
        )}
      />

      <CenteredProductStory
        id="leads"
        eyebrow="Leads"
        heading="Move the opportunity"
        accent="through the pipeline."
        lead="Leads travel New → Contacted → Qualified → Proposal → Negotiation → Won or Lost. Convert can create a client and, optionally, a client project."
        stages={LEAD_STAGES}
        renderCanvas={(progress, reducedMotion) => (
          <LeadsCanvas progress={progress} reducedMotion={reducedMotion} />
        )}
      />

      <ScrollProductStory
        id="proposals"
        eyebrow="Proposals"
        heading="From opportunity"
        accent="to a signed path."
        lead="Draft a proposal for a client, send a public link, and let the client approve or reject. An approved proposal can convert into a project."
        stages={PROPOSAL_STAGES}
        renderCanvas={(progress, reducedMotion) => (
          <ProposalsCanvas progress={progress} reducedMotion={reducedMotion} />
        )}
      />

      <ScrollProductStory
        id="files"
        eyebrow="Files"
        heading="Files stay with"
        accent="the work they belong to."
        lead="Attach files to a project, task, proposal, or client. Download, version, share, favorite, or archive from the file record."
        stages={FILE_STAGES}
        renderCanvas={(progress, reducedMotion) => (
          <FilesCanvas progress={progress} reducedMotion={reducedMotion} />
        )}
      />

      <CenteredProductStory
        id="tags"
        eyebrow="Tags"
        heading="Add lightweight"
        accent="context."
        lead="The tag catalog applies to tasks and project descriptions. Files, clients, and leads can store their own text tags — they are not catalog tags."
        stages={TAG_STAGES}
        renderCanvas={(progress, reducedMotion) => (
          <TagsCanvas progress={progress} reducedMotion={reducedMotion} />
        )}
      />

      <ScrollProductStory
        id="trash"
        eyebrow="Trash"
        heading="Nothing disappears"
        accent="without control."
        lead="Trash is for files and documents. Soft-delete starts a 30-day retention. Restore returns the file; permanent delete is a separate action."
        stages={TRASH_STAGES}
        renderCanvas={(progress, reducedMotion) => (
          <TrashCanvas progress={progress} reducedMotion={reducedMotion} />
        )}
      />

      <CenteredProductStory
        id="search"
        eyebrow="Search"
        heading="From everything"
        accent="to one answer."
        lead="Search looks across projects, tasks, clients, files, leads, proposals, and more in the live workspace. It does not search inside file contents."
        stages={SEARCH_STAGES}
        renderCanvas={(progress, reducedMotion) => (
          <SearchCanvas progress={progress} reducedMotion={reducedMotion} />
        )}
      />

      <ScrollProductStory
        id="reporting"
        eyebrow="Reports"
        heading="Activity becomes"
        accent="something you can use."
        lead="Project and timesheet reports are available on Pro and above. They assemble from work that already exists — there is no custom report builder."
        stages={REPORT_STAGES}
        renderCanvas={(progress, reducedMotion) => (
          <ReportsCanvas progress={progress} reducedMotion={reducedMotion} />
        )}
      />

      <CenteredProductStory
        id="access"
        eyebrow="Workspace access"
        heading="One workspace,"
        accent="different access."
        lead="Roles are Owner, Admin, Manager, Member, Viewer, and Guest. You cannot invite someone as Owner. Guests stay isolated from the internal catalog."
        stages={ACCESS_STAGES}
        renderCanvas={(progress, reducedMotion) => (
          <AccessCanvas progress={progress} reducedMotion={reducedMotion} />
        )}
      />
    </>
  );
}
