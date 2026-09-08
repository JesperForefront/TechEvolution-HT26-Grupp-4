import { useEffect, useState } from 'react'
import type { Kudos } from './kudos'
import { parseKudos } from './parse-kudos'

export function useKudos() {
  const [kudos, setKudos] = useState<readonly Kudos[]>([])
  const [savedKudos, setSavedKudos] = useState<readonly Kudos[] | null>(null)
  const [loadAttempt, setLoadAttempt] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const isLoaded = savedKudos !== null
  const hasUnsavedChanges = isLoaded && kudos !== savedKudos

  useEffect(() => {
    const controller = new AbortController()
    async function load() {
      try {
        const response = await fetch('/kudos.json', { cache: 'no-store', signal: controller.signal })
        if (!response.ok) throw new Error('Could not load kudos.')
        const loadedKudos = parseKudos(await response.text())
        if (controller.signal.aborted) return
        setKudos(loadedKudos)
        setSavedKudos(loadedKudos)
      } catch {
        if (!controller.signal.aborted) setError('Could not load kudos. Please retry.')
      }
    }
    void load()
    return () => controller.abort()
  }, [loadAttempt])

  useEffect(() => {
    if (!hasUnsavedChanges || isSaving || error) return

    setIsSaving(true)
    async function save() {
      try {
        const response = await fetch('/kudos.json', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(kudos),
        })
        if (!response.ok) throw new Error('Could not save kudos.')
        setSavedKudos(kudos)
      } catch {
        setError('Could not save your changes. They are still in the feed. Please retry before leaving.')
      } finally {
        setIsSaving(false)
      }
    }
    void save()
  }, [kudos, hasUnsavedChanges, isSaving, error])

  useEffect(() => {
    if (!hasUnsavedChanges) return
    function handleBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasUnsavedChanges])

  function retry() {
    setError('')
    if (!isLoaded) setLoadAttempt((attempt) => attempt + 1)
  }

  return { kudos, setKudos, isLoaded, isSaving, error, retry }
}
