import * as z from 'zod';
import { useContext } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

import { SearchFormContainer } from "./styles"
import { TransactionsContext } from '../../../../contexts/TransactionsContext';

import { MagnifyingGlass } from "phosphor-react"

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm(){
  const { fetchTransactions } = useContext(TransactionsContext);

  const { 
    register, 
    handleSubmit,
    formState: { isSubmitting } // saber se o form está em estado de submição
   } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input 
        type="text" 
        placeholder="Busque por transações" 
        {...register('query')}
      />
      
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}