import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { assistantsService } from "@/services/assistants.service";
import { Assistant } from "@/types/assistant";

export const ASSISTANTS_QUERY_KEY = ["assistants"];

export function useAssistants() {
  const queryClient = useQueryClient();

  const assistantsQuery = useQuery({
    queryKey: ASSISTANTS_QUERY_KEY,
    queryFn: assistantsService.getAll,
  });

  const createAssistant = useMutation({
    mutationFn: assistantsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ASSISTANTS_QUERY_KEY,
      });
    },
  });

  const updateAssistant = useMutation({
    mutationFn: assistantsService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ASSISTANTS_QUERY_KEY,
      });
    },
  });

  const deleteAssistant = useMutation({
    mutationFn: assistantsService.remove,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey: ASSISTANTS_QUERY_KEY,
      });

      const previous = queryClient.getQueryData<Assistant[]>(
        ASSISTANTS_QUERY_KEY
      );

      queryClient.setQueryData<Assistant[]>(
        ASSISTANTS_QUERY_KEY,
        (old) => old?.filter((a) => a.id !== id)
      );

      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          ASSISTANTS_QUERY_KEY,
          context.previous
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ASSISTANTS_QUERY_KEY,
      });
    },
  });

  return {
    assistantsQuery,
    createAssistant,
    updateAssistant,
    deleteAssistant,
  };
}
