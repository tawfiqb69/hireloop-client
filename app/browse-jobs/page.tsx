import { getJobs } from '@/lib/api/jobs';
import { JobRow } from '../dashboard/recruiter/jobs/page';


const BrowseJobsPage = async({searchParams}: {searchParams: Promise<{[key: string]: string | string[] | undefined}>}) => {
    const search = await searchParams;
    const urlSearch = new URLSearchParams(search as Record<string, string>);
    const query = urlSearch.toString();

    console.log('Search params:', search);
    console.log('Query string:', query);

    const jobs = await getJobs(query);
    return (
        <div>
            
            <h1>Browse Jobs</h1>
            <ul>
                {jobs.map((job) => (
                    <li key={job._id}>
                        <h2>{job.title}</h2>
                        <p>{job.responsibilities}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BrowseJobsPage;