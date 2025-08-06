import fs from 'fs'
import supabase from '../lib/supabaseClient'

async function fetchAndSaveUsers() {
  const { data, error } = await supabase
    .from('admin_user_view') // or your table
    .select('email, name, organization')

  if (error) {
    console.error('Supabase Error:', error.message)
    process.exit(1)
  }

  fs.writeFileSync('users.json', JSON.stringify(data, null, 2))
  console.log('Saved', data.length, 'users')
}

fetchAndSaveUsers().catch(err => {
  console.error('Unexpected error:', err)
  process.exit(1)
})
