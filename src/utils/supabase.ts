// Supabase configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/increment-download`;

export interface DownloadData {
  id: number;
  name: string;
  count: number;
  updated_at: string;
}

// Increment download count in Supabase
export const incrementDownloadCount = async (extensionId: number): Promise<DownloadData | null> => {
  try {
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ extensionId }),
    });

    if (!response.ok) {
      console.error("Failed to increment download count");
      return null;
    }

    const data = await response.json();
    return data[0] || null;
  } catch (error) {
    console.error("Error incrementing download:", error);
    return null;
  }
};

// Fetch all download counts
export const fetchDownloadCounts = async (): Promise<Record<number, number>> => {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/download`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch downloads");
      return {};
    }

    const data: DownloadData[] = await response.json();
    const counts: Record<number, number> = {};
    data.forEach((item) => {
      counts[item.id] = item.count;
    });
    return counts;
  } catch (error) {
    console.error("Error fetching downloads:", error);
    return {};
  }
};
